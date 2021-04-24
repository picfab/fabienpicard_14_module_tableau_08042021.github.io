import React from 'react'
import PropTypes from 'prop-types'
import { up, down } from './svg'

/**
 * Create a header columns toggle for order
 * @module Order
 * @component
 * @param {object} props
 * @prop {boolean} props.showUp
 * @prop {boolean} props.showDown
 * @example
 * return (
 *   <Order
 *      showUp={true}
 *      showDown={true}
 *       />
 * )
 */
export default function Order({ showUp, showDown }) {
  return (
    <div
      className={`tableEmployee__order ${showUp !== showDown ? 'active' : ''}`}>
      {showUp && <div className='tableEmployee__up'>{up}</div>}
      {showDown && <div className='tableEmployee__down'>{down}</div>}
    </div>
  )
}

Order.propTypes = {
  showUp: PropTypes.bool.isRequired,
  showDown: PropTypes.bool.isRequired,
}
