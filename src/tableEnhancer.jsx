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
      onDragColumn: null,
      onChangeColumnsVisibility: null,
    }

    static propTypes = {
      onDragColumn: PropTypes.func,
      onChangeColumnsVisibility: PropTypes.func,
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
      this.setState((state) => dataEnhancer.sortData(state, sortBy));
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
    onPageSizeChange = (perPage) => {
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
    onColumnDrag = (from, to) => {
      const { onDragColumn } = this.props;

      this.setState(
        (state) => dataEnhancer.dragColumn(state, { from, to }),
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
        (state) => dataEnhancer.toggleColumnVisibility(state, columnId),
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
