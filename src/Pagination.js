/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'

/**
 * Return buttons to show
 * @function
 * @param {object} length Length of table data
 * @prop {integer} page The active page
 * @prop {integer} totalPage The total page of the table
 */
const elements = (length, page, totalPage) => {
  const elts = []
  for (let i = 1; i <= totalPage; i += 1) {
    /**
     * When the length of pages it's under 6
     */
    if (length <= 5) {
      elts.push(i)
    } else {
      /**
       * Show first and last page
       * and when the active page it's in firstiest or lastiest pages
       */
      if (
        i === 1 ||
        i === totalPage ||
        (i < 5 && page < 4) ||
        (i >= totalPage - 4 && page > totalPage - 4)
      ) {
        elts.push(i)
      }

      /**
       * When it's a middle page active
       */
      if (
        i >= page - 1 &&
        i <= page + 1 &&
        page <= totalPage - 4 &&
        page >= 4
      ) {
        elts.push(i)
      }

      /**
       * When I add elipsis
       */
      if (
        (i === 2 && page >= 5) ||
        (i === totalPage - 1 && page <= totalPage - 4)
      ) {
        elts.push('…')
      }
    }
  }

  return elts
}

/**
 * Create a Pagination
 * @module Pagination
 * @component
 * @param {object} props
 * @prop {array} props.length Length of table data
 * @prop {array} props.page The active page
 * @prop {number} props.updatePage Function for update current page
 * @prop {number} props.totalPage The total page of the table
 * @example
 * return (
 *   <Pagination
 *        length={100}
 *        page={3}
 *        updatePage={(elt)=>console.log(`Go to Page ${elt}`)}
 *        totalPage ={10}
 *       />
 * )
 */
export default function Pagination({ length, page, updatePage, totalPage }) {
  return (
    <div className='paginationTable'>
      {elements(length, page, totalPage).map((elt, i) =>
        Number.isInteger(elt) ? (
          <button
            type='button'
            className={`paginationTable__page ${page === elt ? 'active' : ''}`}
            key={i}
            disabled={page === elt}
            onClick={() => updatePage(elt)}>
            {elt}
          </button>
        ) : (
          <div key={i}>{elt}</div>
        )
      )}
    </div>
  )
}
Pagination.propTypes = {
  /**
   * Length of table data
   */
  length: PropTypes.number.isRequired,
  /**
   * The active page
   */
  page: PropTypes.number.isRequired,
  /**
   * Function for update current page
   */
  updatePage: PropTypes.func.isRequired,
  /**
   * The total page of the table
   */
  totalPage: PropTypes.number.isRequired,
}
