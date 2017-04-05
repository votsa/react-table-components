import React, { PropTypes, Component } from 'react';

export default class PageSizeSelector extends Component {
  static defaultProps = {
    label: 'records per page',
    perPage: 10,
    controlClassName: '',
    pageSizeOptions: [5, 10, 50],
  }

  static propTypes = {
    onPageSizeChange: PropTypes.func.isRequired,
    perPage: PropTypes.number,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    label: PropTypes.string,
    controlClassName: PropTypes.string,
  }

  render() {
    const {
      controlClassName,
      label,
      onPageSizeChange,
      pageSizeOptions,
      perPage,
    } = this.props;

    return (
      <div className="rtc-page-size-selector">
        <select
          id="page-size-selector"
          className={`rtc-page-size-selector-control ${controlClassName}`}
          onChange={onPageSizeChange}
          value={perPage}
        >
          {pageSizeOptions.map(item => <option key={item.toString()} value={item}>{item}</option>)}
        </select>
        <label
          htmlFor="page-size-selector"
          className="rtc-page-size-selector-label"
        >
          {label}
        </label>
      </div>
    );
  }
}
