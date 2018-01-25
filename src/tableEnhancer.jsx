import React, { PropTypes, Component } from 'react';
import * as dataEnhancer from './dataEnhancer';

/**
 * Create state
 *
 * @param {object} props - component props
 */
const createState = (props) => {
  const {
    dataArray,
    columns,
    sortBy,
    currentPage,
    perPage,
    filters,
  } = props;

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
      ...filters,
      globalSearch: '',
    },
    payload: {},
    sortBy,
  };

  return {
    ...initialState,
    payload: dataEnhancer.calculatePayload(initialState, {
      currentPage,
      perPage,
    }),
  };
};

export default function dataTableEnhancer(WrappedComponent) {
  return class DataTableEnhancer extends Component {
    static defaultProps = {
      sortBy: {},
      perPage: 10,
      currentPage: 0,
      onDragColumnCallback: null,
      onToggleColumnVisibilityCallback: null,
      onSortCallback: null,
    }

    static propTypes = {
      onDragColumnCallback: PropTypes.func,
      onToggleColumnVisibilityCallback: PropTypes.func,
      onSortCallback: PropTypes.func,
    }

    constructor(props) {
      super(props);

      this.state = createState(props);
    }

    componentWillReceiveProps(nextProps) {
      this.setState(createState(nextProps));
    }

    /**
     * On sort
     *
     * @param {object} sortBy - sorting object
     */
    onSort = (sortBy) => {
      const { onSortCallback } = this.props;

      this.setState(
        (state) => dataEnhancer.sortData(state, sortBy),
        () => {
          if (typeof onSortCallback === 'function') {
            onSortCallback(sortBy);
          }
        },
      );
    }

    /**
     * On change page
     *
     * @param {number} page - new page
     */
    onChangePage = (page) => {
      this.setState((state) => dataEnhancer.changePage(state, page));
    }

    /**
     * On change page size
     *
     * @param {number} perPage - new per page value
     */
    onChangePageSize = (perPage) => {
      this.setState((state) => dataEnhancer.changePageSize(state, perPage));
    }

    /**
     * On filter data
     *
     * @param {string} key - filter key
     * @param {string|number} value - filter value
     */
    onFilter = (key, value) => {
      this.setState((state) => dataEnhancer.filterData(state, key, value));
    }

    /**
     * On column drag
     *
     * @param {number} from - from index
     * @param {number} to - to index
     */
    onDragColumn = (from, to) => {
      const { onDragColumnCallback } = this.props;

      this.setState(
        (state) => dataEnhancer.dragColumn(state, { from, to }),
        () => {
          if (typeof onDragColumnCallback === 'function') {
            onDragColumnCallback(this.state.columns);
          }
        },
      );
    }

    /**
     * Toggle column visibility
     *
     * @param {number|string} columnId - column id
     */
    onToggleColumnVisibility = (columnId) => {
      const { onToggleColumnVisibilityCallback } = this.props;

      this.setState(
        (state) => dataEnhancer.toggleColumnVisibility(state, columnId),
        () => {
          if (typeof onToggleColumnVisibilityCallback === 'function') {
            onToggleColumnVisibilityCallback(this.state.columns);
          }
        },
      );
    }

    render() {
      const newProps = {
        onSort: this.onSort,
        onChangePage: this.onChangePage,
        onChangePageSize: this.onChangePageSize,
        onDragColumn: this.onDragColumn,
        onToggleColumnVisibility: this.onToggleColumnVisibility,
        onFilter: this.onFilter,
      };

      return <WrappedComponent {...newProps} {...this.props} {...this.state} />;
    }
  };
}
