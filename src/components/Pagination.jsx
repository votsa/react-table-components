import React, { PropTypes, Component } from 'react';

const cancelEvent = e => e.preventDefault();

export default class Pagination extends Component {
  static defaultProps = {
    showPages: 5,
    perPage: 10,
    currentPage: 0,
    className: null,
  }

  static propTypes = {
    onChangePage: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    showPages: PropTypes.number,
    className: PropTypes.string,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.total !== nextProps.total ||
      this.props.perPage !== nextProps.perPage ||
      this.props.currentPage !== nextProps.currentPage ||
      this.props.showPages !== nextProps.showPages;
  }

  onChangePage = (pageNumber, e) => {
    e.preventDefault();

    this.props.onChangePage(pageNumber);
  }

  render() {
    const { total, perPage, showPages, currentPage } = this.props;

    if (total === 0) {
      return null;
    }

    const totalPages = Math.ceil(total / perPage);
    const diff = Math.floor(showPages / 2);
    let start = Math.max(currentPage - diff, 0);
    const end = Math.min(start + showPages, totalPages);
    let buttons = [];
    let btnEvent;
    let isCurrent;

    if (totalPages >= showPages && end >= totalPages) {
      start = totalPages - showPages;
    }

    for (let i = start; i < end; i++) {
      isCurrent = currentPage === i;
      if (isCurrent) {
        btnEvent = cancelEvent;
      } else {
        btnEvent = e => this.onChangePage(i, e);
      }

      buttons.push(
        <li key={i} className={isCurrent ? 'active' : null}>
          <a role="button" href={undefined} onClick={btnEvent} tabIndex="0">
            <span>{i + 1}</span>
            {isCurrent ? <span className="sr-only">(current)</span> : null}
          </a>
        </li>,
      );
    }

    const isNotFirst = currentPage > 0;
    const isNotLast = currentPage < totalPages - 1;
    const firstHandler = isNotFirst ? e => this.onChangePage(0, e) : cancelEvent;
    const prevHandler = isNotFirst ? e => this.onChangePage(currentPage - 1, e) : cancelEvent;
    const nextHandler = isNotLast ? e => this.onChangePage(currentPage + 1, e) : cancelEvent;
    const lastHandler = isNotLast ? e => this.onChangePage(totalPages - 1, e) : cancelEvent;

    if (start >= diff) {
      buttons = [
        <li key="dotsFirst" className={!isNotFirst ? 'disabled' : null}>
          <a
            role="button"
            href={undefined}
            tabIndex="0"
            onClick={prevHandler}
            aria-disabled={!isNotFirst}
          >
            ...
          </a>
        </li>,
      ].concat(buttons);
    }

    if (end > showPages) {
      buttons = [
        <li key="first" className={!isNotFirst ? 'disabled' : null}>
          <a
            role="button"
            href={undefined}
            tabIndex="0"
            onClick={firstHandler}
            aria-disabled={!isNotFirst}
            aria-label="First"
          >
            1
          </a>
        </li>,
      ].concat(buttons);
    }

    buttons = [
      <li key="prev" className={!isNotFirst ? 'disabled' : null}>
        <a
          role="button"
          href={undefined}
          tabIndex="0"
          onClick={prevHandler}
          aria-disabled={!isNotFirst}
          aria-label="Previous"
        >
          <span className="fa fa-angle-left" aria-hidden="true" />
        </a>
      </li>,
    ].concat(buttons);

    if (end <= totalPages - diff) {
      buttons = buttons.concat([
        <li key="dotsLast" className={!isNotLast ? 'disabled' : null}>
          <a
            role="button"
            href={undefined}
            tabIndex="0"
            onClick={nextHandler}
            aria-disabled={!isNotLast}
            aria-label="Next"
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
            role="button"
            href={undefined}
            tabIndex="0"
            onClick={lastHandler}
            aria-disabled={!isNotLast}
            aria-label="Last"
          >
            {totalPages}
          </a>
        </li>,
      ]);
    }

    buttons = buttons.concat([
      <li key="next" className={!isNotLast ? 'disabled' : null}>
        <a
          role="button"
          href={undefined}
          tabIndex="0"
          onClick={nextHandler}
          aria-disabled={!isNotLast}
          aria-label="Next"
        >
          <span className="fa fa-angle-right" aria-hidden="true" />
        </a>
      </li>,
    ]);

    return (
      <ul className={this.props.className} aria-label="Pagination">
        {buttons}
      </ul>
    );
  }
}
