import React, { PropTypes } from 'react';

const RecordsCounter = (props) => {
  const {
    total,
    currentPage,
    perPage,
  } = props;

  const from = (Number(currentPage) * Number(perPage)) + 1;
  const to = (Number(currentPage) * Number(perPage)) + Number(perPage);

  return (
    <div className="rtc-records-counter">
      {`Showing ${from} to ${to < total ? to : total} of ${total} records`}
    </div>
  );
};

RecordsCounter.defaultProps = {
  perPage: 10,
  currentPage: 0,
};

RecordsCounter.propTypes = {
  perPage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  currentPage: PropTypes.number,
  total: PropTypes.number.isRequired,
};

export default RecordsCounter;
