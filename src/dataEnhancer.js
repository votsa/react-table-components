import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import { ignoreCase } from './utils';

export const calculatePayload = (state, params) => {
  const { dataArray, columns } = state;
  const filters = params.filters || state.filters;

  let filteredData = [].concat(dataArray);

  if (filters && filters.globalSearch) {
    filteredData = dataArray.filter((row) => {
      let flag = false;

      for (let i = columns.length - 1; i >= 0; i--) {
        const prop = columns[i].prop;

        if (prop) {
          const value = get(row, prop);

          flag = ignoreCase(value).indexOf(ignoreCase(filters.globalSearch)) !== -1;

          if (flag) {
            break;
          }
        }
      }

      return flag;
    });
  }

  const sortBy = params.sortBy || state.sortBy;

  if (sortBy) {
    filteredData = orderBy(filteredData, sortBy.prop, sortBy.order);
  }

  const currentPage = Number(
    typeof params.currentPage !== 'undefined'
      ? params.currentPage
      : state.payload.currentPage,
  );

  const perPage = Number(
    typeof params.perPage !== 'undefined'
      ? params.perPage
      : state.payload.perPage,
  );

  const start = perPage * currentPage;

  return {
    perPage,
    currentPage,
    data: filteredData.slice(start, start + perPage),
    total: filteredData.length,
  };
};

/**
 * Data sort
 *
 * @param {object} state
 * @param {object} sortBy - sorting object
 */
export const sortData = (state, sortBy) => ({
  sortBy,
  payload: calculatePayload(state, {
    currentPage: 0,
    sortBy,
  }),
});

/**
 * Data filter
 *
 * @param {object} state
 * @param {string} key - filter key
 * @param {string|number} value - filter value
 */
export const filterData = (state, key, value) => ({
  filters: {
    ...state.filters,
    [key]: value,
  },
  payload: calculatePayload(state, {
    filters: {
      [key]: value,
    },
    currentPage: 0,
  }),
});

/**
 * Change page
 *
 * @param {object} state
 * @param {number} currentPage - new page
 */
export const changePage = (state, currentPage) => ({
  payload: calculatePayload(state, { currentPage }),
});

/**
 * Change page size
 *
 * @param {object} state
 * @param {number} perPage - rows per page
 */
export const changePageSize = (state, perPage) => {
  const currentPage = perPage
    ? Math.floor((state.payload.currentPage * state.payload.perPage) / perPage)
    : 0;

  return {
    payload: calculatePayload(state, { currentPage, perPage }),
  };
};

/**
 * Drag columns
 *
 * @param {object} state
 * @param {object} order - order object
 */
export const dragColumn = (state, order) => {
  const { from, to } = order;

  if (from !== to) {
    const columns = [].concat(state.columns);

    // Set new columns order
    columns.splice(to, 0, columns.splice(from, 1)[0]);

    return { columns };
  }

  return state;
};

/**
 * Toggle column's visibility
 *
 * @param {object} state
 * @param {number|string} columnId - column's id
 */
export const toggleColumnVisibility = (state, columnId) => {
  const columns = state.columns.map((col) => {
    if (col.id === columnId) {
      return {
        ...col,
        visible: !col.visible,
      };
    }

    return col;
  });

  return { columns };
};
