import React, { Component, PropTypes } from 'react';
import tableEnhancer from '../tableEnhancer';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import ColumnsVisibility from '../components/ColumnsVisibility';
import PageSizeSelector from '../components/PageSizeSelector';
import RecordsCounter from '../components/RecordsCounter';
import SearchField from '../components/SearchField';

export class BootstrapContainer extends Component {
  static defaultProps = {
    draggable: false,
    sortable: false,
    onColumnDrag: null,
    sortBy: null,
    className: null,
    generateRowProps: null,
    filters: null,
    pageSizeOptions: null,
  }

  static propTypes = {
    generateRowProps: PropTypes.func,
    onColumnDrag: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
    onToggleColumnsVisibility: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    sortBy: PropTypes.shape({
      prop: PropTypes.string,
      order: PropTypes.string,
    }),
    filters: PropTypes.object,
    payload: PropTypes.object.isRequired,
    sortable: PropTypes.bool,
    draggable: PropTypes.bool,
    className: PropTypes.string,
    keys: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]).isRequired,
  }

  render() {
    const {
      keys, className, draggable, sortable, sortBy, columns, onSort,
      payload, onChangePage, onPageSizeChange, onColumnDrag, onToggleColumnsVisibility,
      filters, onFilter, generateRowProps, pageSizeOptions,
    } = this.props;

    return (
      <div>
        <div className="row content-row">
          <div className="col-md-6">
            <div className="form-inline">
              <SearchField
                value={filters.globalSearch}
                onChange={onFilter}
                filterKey="globalSearch"
                className="form-group"
                controlClassName="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <ColumnsVisibility
              columns={columns}
              onToggleColumnsVisibility={onToggleColumnsVisibility}
              btnText="Columns visibility"
              btnClassName="btn btn-default btn-sm"
              iconClassName="fa fa-bars"
            />
          </div>
        </div>
        <div className="row content-row">
          <div className="col-md-12">
            <div className="table-responsive rtc-table-responsive">
              <div className="rtc-table-container">
                <Table
                  keys={keys}
                  className={className}
                  columns={columns}
                  dataArray={payload.data}
                  sortable={sortable}
                  sortBy={sortBy}
                  onSort={onSort}
                  draggable={draggable}
                  onColumnDrag={onColumnDrag}
                  generateRowProps={generateRowProps}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row content-row">
          <div className="col-md-6">
            <PageSizeSelector
              onPageSizeChange={onPageSizeChange}
              perPage={payload.perPage}
              pageSizeOptions={pageSizeOptions}
              controlClassName="form-control"
            />
            <RecordsCounter
              total={payload.total}
              currentPage={payload.currentPage}
              perPage={payload.perPage}
            />
          </div>
          <div className="col-md-6">
            <Pagination
              className="pagination pull-right"
              currentPage={payload.currentPage}
              total={payload.total}
              perPage={payload.perPage}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default tableEnhancer(BootstrapContainer);
