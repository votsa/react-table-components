import * as dataEnhancer from '../dataEnhancer';
import { SORT_ORDERS } from '../constants';

const columns = [
  { id: 1, title: 'First name', prop: 'first_name' },
  { id: 2, title: 'Last name', prop: 'last_name' },
];

const dataArray = [
  { id: 1, first_name: 'Jhon', last_name: 'Dou' },
  { id: 2, first_name: 'Vasily', last_name: 'Pupkin' },
  { id: 3, first_name: 'Anna', last_name: 'Lee' },
];

const sortBy = {
  prop: 'first_name',
  order: SORT_ORDERS.ASC,
};

const initialState = {
  columns,
  columnsVisible: columns.map(column => column.id),
  dataArray,
  filters: {
    globalSearch: '',
  },
  payload: {},
  sortBy,
};

describe('dataEnhancer', () => {
  it('changes current page', () => {
    const state = {
      ...initialState,
      payload: dataEnhancer.calculatePayload(initialState, { sortBy, currentPage: 0, perPage: 10 }),
    };

    const expected = {
      payload: {
        ...state.payload,
        currentPage: 1,
        data: [],
      },
    };

    expect(dataEnhancer.changePage(state, 1)).toEqual(expected);
  });

  it('changes page size', () => {
    const state = {
      ...initialState,
      payload: dataEnhancer.calculatePayload(initialState, { sortBy, currentPage: 0, perPage: 10 }),
    };

    const expected = {
      payload: {
        ...state.payload,
        perPage: 5,
      },
    };

    expect(dataEnhancer.changePageSize(state, 5)).toEqual(expected);
  });

  it('toogles columns visibility', () => {
    const state = {
      ...initialState,
      payload: dataEnhancer.calculatePayload(initialState, { sortBy, currentPage: 0, perPage: 10 }),
    };

    const expected = {
      columnsVisible: [2],
    };

    expect(dataEnhancer.toggleColumnVisibility(state, 1)).toEqual(expected);
  });

  it('drags column', () => {
    const state = {
      ...initialState,
      payload: dataEnhancer.calculatePayload(initialState, { sortBy, currentPage: 0, perPage: 10 }),
    };

    const expected = {
      columns: [
        { id: 2, title: 'Last name', prop: 'last_name' },
        { id: 1, title: 'First name', prop: 'first_name' },
      ],
    };

    expect(dataEnhancer.dragColumn(state, { from: 0, to: 1 })).toEqual(expected);
  });

  it('filters data', () => {
    const searchValue = 'vasi';

    const state = {
      ...initialState,
      payload: dataEnhancer.calculatePayload(initialState, { sortBy, currentPage: 0, perPage: 10 }),
    };

    const expected = {
      filters: {
        globalSearch: searchValue,
      },
      payload: {
        ...state.payload,
        currentPage: 0,
        total: 1,
        data: [{
          id: 2,
          first_name: 'Vasily',
          last_name: 'Pupkin',
        }],
      },
    };

    expect(dataEnhancer.filterData(state, 'globalSearch', searchValue)).toEqual(expected);
  });

  it('sorts ascending', () => {
    const state = {
      ...initialState,
      payload: dataEnhancer.calculatePayload(initialState, { sortBy, currentPage: 0, perPage: 10 }),
    };

    const expected = {
      sortBy: { prop: 'last_name', order: SORT_ORDERS.ASC },
      payload: {
        ...state.payload,
        currentPage: 0,
        data: [
        { id: 1, first_name: 'Jhon', last_name: 'Dou' },
        { id: 3, first_name: 'Anna', last_name: 'Lee' },
        { id: 2, first_name: 'Vasily', last_name: 'Pupkin' },
        ],
      },
    };

    expect(
      dataEnhancer.sortData(state, { prop: 'last_name', order: SORT_ORDERS.ASC }),
    ).toEqual(expected);
  });

  it('sorts descending', () => {
    const state = {
      ...initialState,
      payload: dataEnhancer.calculatePayload(initialState, { sortBy, currentPage: 0, perPage: 10 }),
    };

    const expected = {
      sortBy: { prop: 'last_name', order: SORT_ORDERS.DESC },
      payload: {
        ...state.payload,
        currentPage: 0,
        data: [
        { id: 2, first_name: 'Vasily', last_name: 'Pupkin' },
        { id: 3, first_name: 'Anna', last_name: 'Lee' },
        { id: 1, first_name: 'Jhon', last_name: 'Dou' },
        ],
      },
    };

    expect(
      dataEnhancer.sortData(state, { prop: 'last_name', order: SORT_ORDERS.DESC }),
    ).toEqual(expected);
  });
});
