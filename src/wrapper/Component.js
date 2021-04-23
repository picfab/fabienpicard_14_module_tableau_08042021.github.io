/* eslint-disable react/prop-types */
import React from 'react'

/**
 * Wrapper for preview in documentation
 * @ignore
 */
const Component = (props) => {
  const { children } = props
  return (
    <>
      <head>
        <link type='text/css' rel='stylesheet' href='styles.css' />
      </head>
      <div>{children}</div>
    </>
  )
}

export default Component
