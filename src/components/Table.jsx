import React, { PropTypes, Component } from 'react';
import get from 'lodash/get';
import * as c from '../constants';

const simpleGet = key => data => data[key];
const keyGetter = keys => data => keys.map(key => data[key]);

const getCellValue = ({ prop, defaultContent, render }, row) => {
  if (render) {
    return render(row);
  }

  if (prop) {
    return get(row, prop, defaultContent) || defaultContent;
  }

  return defaultContent;
};

export default class Table extends Component {
  static defaultProps = {
    draggable: false,
    sortable: false,
    onColumnDrag: null,
    sortBy: null,
    className: null,
    generateRowProps: null,
  }

  static propTypes = {
    sortable: PropTypes.bool,
    sortBy: PropTypes.shape({
      prop: PropTypes.string,
      order: PropTypes.string,
    }),
    onSort: PropTypes.func.isRequired,
    draggable: PropTypes.bool,
    onColumnDrag: PropTypes.func.isRequired,
    className: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    generateRowProps: PropTypes.func,
    dataArray: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ])).isRequired,
    keys: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]).isRequired,
  }

  constructor(props) {
    super(props);

    if (props.draggable) {
      this.createDragContainer();
    }
  }

  componentWillUnmount() {
    if (this.props.draggable) {
      document.body.removeChild(this.dragContainer);
    }
  }

  /**
   * Create container for dragged element
   */
  createDragContainer() {
    this.dragContainer = document.createElement('div');
    this.dragContainer.className = c.CLASS_NAMES.DRAG_CONTAINER;

    document.body.appendChild(this.dragContainer);
  }

  /**
   * On drag start
   *
   * @param {object} e - event object
   */
  dragStart = (e) => {
    this.dragged = e.currentTarget;
    // Copy dragged element's content to draggable container
    this.dragContainer.innerHTML = this.dragged.innerHTML;
    // FF requires any data in dataTransfer object to make elements draggable
    e.dataTransfer.setData('_data_', '');
    // Set draggable container to dataTransfer
    e.dataTransfer.setDragImage(this.dragContainer, 0, 0);
  }

  /**
   * On drag end
   *
   * @param {object} e - event object
   */
  dragEnd = () => {
    const { onColumnDrag } = this.props;
    const from = Number(this.dragged.dataset.index);
    const to = Number(this.over ? this.over.dataset.index : this.dragged.dataset.index);

    this.cleanUpOverElement();
    this.dragContainer.innerHTML = '';

    onColumnDrag(from, to);
  }

  /**
   * On drag over
   *
   * @param {object} e - event object
   */
  dragOver = (e) => {
    e.preventDefault();

    if (this.props.draggable) {
      const target = e.target.closest('th');

      if (target) {
        // Set drop effect
        e.dataTransfer.dropEffect = 'move';

        // Clean previous over heading
        if (this.over && target !== this.over) {
          this.cleanUpOverElement();
        }

        // Set new over heading
        this.over = target;

        if (this.over !== this.dragged) {
          const directionClassName =
            Number(this.dragged.dataset.index) < Number(this.over.dataset.index)
              ? c.CLASS_NAMES.DRAG_FORWARD
              : c.CLASS_NAMES.DRAG_BACK;

          this.over.classList.add(
            c.CLASS_NAMES.DRAG_OVER,
            directionClassName,
          );
        }
      }
    }
  }

  /**
   * On drag leave
   */
  dragLeave = () => {
    this.cleanUpOverElement();
  }

  /**
   * Cleanup
   */
  cleanUpOverElement() {
    if (this.over) {
      this.over.classList.remove(
        c.CLASS_NAMES.DRAG_OVER,
        c.CLASS_NAMES.DRAG_FORWARD,
        c.CLASS_NAMES.DRAG_BACK,
      );
    }
  }

  /**
   * Header properties
   *
   * @param {object} col - column object
   */
  generateHeaderProps(col) {
    const { sortable, sortBy, onSort, draggable } = this.props;
    const headerProps = {
      className: col.headerClass ? `${col.headerClass} heading` : 'heading',
    };

    if (sortable && col.prop && col.sortable !== false) {
      headerProps.onClick = () => onSort({
        prop: col.prop,
        order: sortBy.order === c.SORT_ORDERS.DESC ? c.SORT_ORDERS.ASC : c.SORT_ORDERS.DESC,
      });

      headerProps.className += ' sortable';

      if (sortBy.prop === col.prop) {
        headerProps.className += ` ${sortBy.order}`;
      }
    }

    if (draggable) {
      headerProps.draggable = true;
      headerProps.onDragStart = this.dragStart;
      headerProps.onDragEnd = this.dragEnd;
      headerProps.onDragLeave = this.dragLeave;
    }

    return headerProps;
  }

  /**
   * Row properties
   *
   * @param {object} row - row object
   */
  generateRowProps(row) {
    const { keys, generateRowProps } = this.props;
    const getKeys = Array.isArray(keys) ? keyGetter(keys) : simpleGet(keys);

    const props = {
      key: getKeys(row),
    };

    if (typeof generateRowProps === 'function') {
      return {
        ...props,
        ...generateRowProps(row),
      };
    }

    return props;
  }

  render() {
    const { dataArray, columns } = this.props;

    const headers = columns.map((col, index) => {
      if (col.visible === false) {
        return null;
      }

      const headerProps = this.generateHeaderProps(col);

      return (
        <th
          key={col.id}
          style={{ width: col.width }}
          data-index={index}
          {...headerProps}
        >
          <span>
            {col.titleComponent ? col.titleComponent() : col.title}
          </span>
        </th>
      );
    });

    const rows = dataArray.map((row) => {
      const rowOptions = this.generateRowProps(row);

      return (
        <tr {...rowOptions}>
          {columns.map((col) => {
            if (col.visible === false) {
              return null;
            }

            return (
              <td key={col.id} className={col.cellClass ? col.cellClass : null}>
                {getCellValue(col, row)}
              </td>
            );
          })}
        </tr>
      );
    });

    return (
      <table className={`rtc-table ${this.props.className}`} onDragOver={this.dragOver}>
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows :
          <tr>
            <td colSpan={columns.filter(col => col.visible).length} className="no-data">No data</td>
          </tr>
          }
        </tbody>
      </table>
    );
  }
}
