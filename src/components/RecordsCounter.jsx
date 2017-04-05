import React, { PropTypes, Component } from 'react';

export default class RecordsCounter extends Component {
  static defaultProps = {
    perPage: 10,
    currentPage: 0,
  }

  static propTypes = {
    perPage: PropTypes.number,
    currentPage: PropTypes.number,
    total: PropTypes.number.isRequired,
  }

  render() {
    const { total, currentPage, perPage } = this.props;
    const from = (Number(currentPage) * Number(perPage)) + 1;
    const to = (Number(currentPage) * Number(perPage)) + Number(perPage);

    return (
      <div className="rtc-records-counter">
        {`Showing ${from} to ${to < total ? to : total} of ${total} records`}
      </div>
    );
  }
}
