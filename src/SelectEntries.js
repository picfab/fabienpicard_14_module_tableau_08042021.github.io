/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'

/**
 * Create a select input for change number of entries to show
 * @module SelectEntries
 * @component
 * @param {object} props
 * @prop {integer} props.value The value of selector
 * @prop {function} props.onChange Funciton for update the number of entries to show
 * @example
 * return (
 *   <SelectEntries
 *      value={10}
 *      onChange={(elt)=>console.log('Value : '+elt)}
 *       />
 * )
 */
export default function SelectEntries({ value, onChange }) {
  return (
    <div className='select'>
      <label htmlFor='nbEntries'>Show</label>
      <select
        id='nbEntries'
        value={value}
        onChange={(e) => onChange(e.target.value)}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <label htmlFor='nbEntries'>entries</label>
    </div>
  )
}
SelectEntries.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
}
