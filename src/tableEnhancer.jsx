import React, { PropTypes, Component } from 'react';
import * as dataEnhancer from './dataEnhancer';

export default function dataTableEnhancer(WrappedComponent) {
  return class DataTableEnhancer extends Component {
    static defaultProps = {
      currentPage: 0,
      perPage: 10,
      sortBy: null,
      onDragColumn: null,
      onChangeColumnsVisibility: null,
    }

    static propTypes = {
      perPage: PropTypes.number,
      currentPage: PropTypes.number,
      columns: PropTypes.arrayOf(PropTypes.object).isRequired,
      sortBy: PropTypes.shape({
        prop: PropTypes.string,
        order: PropTypes.string,
      }),
      onDragColumn: PropTypes.func,
      onChangeColumnsVisibility: PropTypes.func,
      dataArray: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
      ])).isRequired,
    }

    constructor(props) {
      super(props);

      const { dataArray, columns, sortBy, currentPage, perPage } = props;

      const initialState = {
        columns: columns.map((col) => {
          if (typeof col.visible === 'undefined') {
            return {
              ...col,
              visible: true,
            };
          }
          return col;
        }),
        dataArray,
        filters: {
          globalSearch: '',
        },
        payload: {},
        sortBy,
      };

      this.state = {
        ...initialState,
        payload: dataEnhancer.calculatePayload(initialState, {
          currentPage,
          perPage,
        }),
      };
    }

    /**
     * On sort
     *
     * @param {object} sortBy - sorting object
     */
    onSort = (sortBy) => {
      this.setState(state => dataEnhancer.sortData(state, sortBy));
    }

    /**
     * On change page
     *
     * @param {number} page - new page
     */
    onChangePage = (page) => {
      this.setState(state => dataEnhancer.changePage(state, page));
    }

    /**
     * On change page size
     *
     * @param {object} e - event
     */
    onPageSizeChange = (e) => {
      const perPage = e.target.value;

      this.setState(state => dataEnhancer.changePageSize(state, perPage));
    }

    /**
     * On filter data
     *
     * @param {string} key - filter key
     * @param {string|number} value - filter value
     */
    onFilter = (key, value) => {
      this.setState(state => dataEnhancer.filterData(state, key, value));
    }

    /**
     * On column drag
     *
     * @param {number} from - from index
     * @param {number} to - to index
     */
    onColumnDrag = (from, to) => {
      const { onDragColumn } = this.props;

      this.setState(
        state => dataEnhancer.dragColumn(state, { from, to }),
        () => {
          if (typeof onDragColumn === 'function') {
            onDragColumn(this.state.columns);
          }
        },
      );
    }

    /**
     * Toggle column visibility
     *
     * @param {number|string} columnId - column id
     */
    onToggleColumnsVisibility = (columnId) => {
      const { onChangeColumnsVisibility } = this.props;

      this.setState(
        state => dataEnhancer.toggleColumnVisibility(state, columnId),
        () => {
          if (typeof onChangeColumnsVisibility === 'function') {
            onChangeColumnsVisibility(this.state.columns);
          }
        },
      );
    }

    render() {
      const newProps = {
        onSort: this.onSort,
        onChangePage: this.onChangePage,
        onPageSizeChange: this.onPageSizeChange,
        onColumnDrag: this.onColumnDrag,
        onToggleColumnsVisibility: this.onToggleColumnsVisibility,
        onFilter: this.onFilter,
      };

      return <WrappedComponent {...newProps} {...this.props} {...this.state} />;
    }
  };
}
