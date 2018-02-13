import React from 'react';
import PropTypes from 'prop-types';
import { CLASS_NAMES } from '../constants';

const RecordsCounter = (props) => {
  const {
    total,
    currentPage,
    perPage,
  } = props;

  const from = (Number(currentPage) * Number(perPage)) + 1;
  const to = (Number(currentPage) * Number(perPage)) + Number(perPage);

  return (
    <div className={CLASS_NAMES.RECORDS_COUNTER}>
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
