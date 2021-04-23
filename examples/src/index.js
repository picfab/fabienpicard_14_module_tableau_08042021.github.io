import React from 'react'
import { render } from 'react-dom'
import MyComponent from '../../src'
import { users } from './users'

function App() {
  const cols = [
    {
      index: 'firstName',
      label: 'First Name',
    },
    {
      index: 'lastName',
      label: 'Last Name',
    },
    {
      index: 'dateOfBirth',
      label: 'Date of Birth',
    },
    {
      index: 'startDate',
      label: 'Start Date',
    },
    {
      index: 'department',
      label: 'Department',
    },
    {
      index: 'street',
      label: 'Street',
    },
    {
      index: 'city',
      label: 'City',
    },
    {
      index: 'zipCode',
      label: 'Zip Code',
    },
  ]

  return <MyComponent data={users} cols={cols} page={2} perPage={23} />
}
render(<App />, document.getElementById('root'))
