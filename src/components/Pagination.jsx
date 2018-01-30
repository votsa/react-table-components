import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CLASS_NAMES } from '../constants';

const cancelEvent = (e) => e.preventDefault();

export default class Pagination extends Component {
  static defaultProps = {
    showPages: 5,  // deprecated
    visiblePages: 5,
    perPage: 10,
    currentPage: 0,
    className: '',
    btnClassName: '',
    btnActiveClassName: '',
    prevBtnComponent: <span>Prev</span>,
    nextBtnComponent: <span>Next</span>,
  }

  static propTypes = {
    onChangePage: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    perPage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    currentPage: PropTypes.number.isRequired,
    visiblePages: PropTypes.number,
    className: PropTypes.string,
    btnClassName: PropTypes.string,
    btnActiveClassName: PropTypes.string,
    prevBtnComponent: PropTypes.element,
    nextBtnComponent: PropTypes.element,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.total !== nextProps.total ||
      this.props.perPage !== nextProps.perPage ||
      this.props.currentPage !== nextProps.currentPage ||
      this.props.visiblePages !== nextProps.visiblePages;
  }

  handleChangePage = (pageNumber, e) => {
    e.preventDefault();

    this.props.onChangePage(pageNumber);
  }

  render() {
    const {
      total,
      perPage,
      visiblePages,
      currentPage,
      btnClassName,
      prevBtnComponent,
      nextBtnComponent,
      btnActiveClassName,
    } = this.props;

    if (total === 0) {
      return null;
    }

    const totalPages = Math.ceil(total / perPage);
    const diff = Math.floor(visiblePages / 2);
    let start = Math.max(currentPage - diff, 0);
    const end = Math.min(start + visiblePages, totalPages);
    let buttons = [];
    let btnEvent;
    let isCurrent;
    let btnClass;

    if (totalPages >= visiblePages && end >= totalPages) {
      start = totalPages - visiblePages;
    }

    if (end < visiblePages) {
      start = 0;
    }

    for (let i = start; i < end; i++) {
      isCurrent = currentPage === i;
      if (isCurrent) {
        btnEvent = cancelEvent;
      } else {
        btnEvent = (e) => this.handleChangePage(i, e);
      }

      btnClass = btnClassName || '';

      if (isCurrent) {
        btnClass += ` ${btnActiveClassName}`;
        btnClass = btnClass.trim();
      }

      buttons.push(
        <li key={i} className={isCurrent ? 'active' : null}>
          <a
            href={undefined}
            onClick={btnEvent}
            className={btnClass || null}
            tabIndex="0"
          >
            <span>{i + 1}</span>
            {isCurrent ? <span className="sr-only">(current)</span> : null}
          </a>
        </li>,
      );
    }

    const isNotFirst = currentPage > 0;
    const isNotLast = currentPage < totalPages - 1;
    const firstHandler = isNotFirst ? (e) => this.handleChangePage(0, e) : cancelEvent;
    const prevHandler = isNotFirst ? (e) => this.handleChangePage(currentPage - 1, e) : cancelEvent;
    const nextHandler = isNotLast ? (e) => this.handleChangePage(currentPage + 1, e) : cancelEvent;
    const lastHandler = isNotLast ? (e) => this.handleChangePage(totalPages - 1, e) : cancelEvent;

    if (start >= diff) {
      buttons = [
        <li key="dotsFirst" className={!isNotFirst ? 'disabled' : null}>
          <a
            href={undefined}
            onClick={prevHandler}
            className={btnClassName || null}
            tabIndex="0"
          >
            ...
          </a>
        </li>,
      ].concat(buttons);
    }

    if (end > visiblePages) {
      buttons = [
        <li key="first" className={!isNotFirst ? 'disabled' : null}>
          <a
            href={undefined}
            onClick={firstHandler}
            className={btnClassName || null}
            tabIndex="0"
          >
            1
          </a>
        </li>,
      ].concat(buttons);
    }

    buttons = [
      <li key="prev" className={!isNotFirst ? 'disabled' : null}>
        <a
          href={undefined}
          onClick={prevHandler}
          className={btnClassName || null}
          tabIndex="0"
        >
          {prevBtnComponent}
        </a>
      </li>,
    ].concat(buttons);

    if (end <= totalPages - diff) {
      buttons = buttons.concat([
        <li key="dotsLast" className={!isNotLast ? 'disabled' : null}>
          <a
            href={undefined}
            onClick={nextHandler}
            className={btnClassName || null}
            tabIndex="0"
          >
            ...
          </a>
        </li>,
      ]);
    }

    if (end !== totalPages) {
      buttons = buttons.concat([
        <li key="last" className={!isNotLast ? 'disabled' : null}>
          <a
            href={undefined}
            onClick={lastHandler}
            className={btnClassName || null}
            tabIndex="0"
          >
            {totalPages}
          </a>
        </li>,
      ]);
    }

    buttons = buttons.concat([
      <li key="next" className={!isNotLast ? 'disabled' : null}>
        <a
          href={undefined}
          onClick={nextHandler}
          className={btnClassName || null}
          tabIndex="0"
        >
          {nextBtnComponent}
        </a>
      </li>,
    ]);

    return (
      <ul className={`${CLASS_NAMES.PAGINATION} ${this.props.className}`}>
        {buttons}
      </ul>
    );
  }
}
