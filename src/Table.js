/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Pagination from './Pagination'
import Order from './Order'
import SelectEntries from './SelectEntries'

/**
 * Create a Table of data
 * @module Table
 * @component
 * @param {object} props
 * @prop {array} props.cols Array of obelect with columns's information like : { index:'column-index', label:'the name of column'}
 * @prop {array} props.data Array of data to show by line
 * @prop {number} props.perPage Number of element per page. Each key have to correspond with an index to an element of cols's props.
 * @prop {number} props.page The default page
 * @example
 * return (
 *   <Table
 *       cols={[
 *             {
 *               index: 'firstName',
 *               label: 'First Name',
 *             },
 *             {
 *               index: 'lastName',
 *               label: 'Last Name',
 *             },
 *             {
 *               index: 'dateOfBirth',
 *               label: 'Date of Birth',
 *             },
 *             {
 *               index: 'startDate',
 *               label: 'Start Date',
 *             },
 *             {
 *               index: 'department',
 *               label: 'Department',
 *             },
 *             {
 *               index: 'street',
 *               label: 'Street',
 *             },
 *             {
 *               index: 'city',
 *               label: 'City',
 *             },
 *             {
 *               index: 'zipCode',
 *               label: 'Zip Code',
 *             },
 *           ]}
 *       data={[
 *           {'firstName':'Fabien',
 *          'lastName':'Picard',
 *           'dateOfBirth':'04/15/2021',
 *           'startDate':'04/15/2021 19:04',
 *           'department':'AS',
 *           'street':'2 rue Pen Ar Run',
 *           'city':'Brest',
 *           'state':'AL',
 *           'zipCode':'29200'},
 *           {'firstName':'Elise',
 *           'lastName':'Leclercq',
 *           'dateOfBirth':'04/21/2021',
 *           'startDate':'04/09/2021 19:05',
 *           'department':'AL',
 *           'street':'Zone Aviation Générale  Aéroport Aimé Césaire',
 *           'city':'Brest',
 *           'state':'CA',
 *           'zipCode':'29200'},
 *           {'firstName':'Elise',
 *           'lastName':'Leclercq',
 *           'dateOfBirth':'04/14/2021',
 *           'startDate':'04/24/2021 19:11',
 *           'department':'marketing',
 *           'street':'Zone Aviation Générale  Aéroport Aimé Césaire',
 *           'city':'LE LAMENTIN',
 *           'state':'AS',
 *           'zipCode':'97232'},
 *           {'firstName':'aaaa',
 *           'lastName':'zzzz',
 *           'dateOfBirth':'04/01/2021',
 *           'startDate':'04/17/2021 19:12',
 *           'department':'marketing',
 *           'street':'2 rue Pen Ar Run',
 *           'city':'Brest',
 *           'state':'AZ',
 *           'zipCode':'29200'}
 *         ]}
 *         perPage={10}
 *         page={1}
 *       />
 * )
 */
export default function Table({ cols, data, perPage, page }) {
  /**
   * State
   */
  const [innerPage, setInnerPage] = useState(1)
  const [innerPerPage, setInnerPerPage] = useState(10)
  const [order, setOrder] = useState('desc')
  const [orderType, setOrderType] = useState(null)
  const [search, setSearch] = useState('')
  /**
   * variable
   */
  let totalPage = data.length / innerPerPage
  totalPage = totalPage < 1 ? 1 : Math.ceil(totalPage)

  useEffect(() => {
    if (page) {
      setInnerPage(page)
    }
    if (perPage) {
      setInnerPerPage(perPage)
    }
    if (!orderType && data.length > 0) {
      setOrderType(cols[0].index)
    }
  }, [page, perPage, data])

  /**
   * eventListener
   */
  const prev = () => setInnerPage(innerPage - 1)
  const next = () => setInnerPage(innerPage + 1)
  const searchData = (e) => {
    setSearch(e.target.value)
    setInnerPage(1)
  }
  const changeOrder = (type) => {
    if (type !== orderType) {
      setOrder('asc')
    } else {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    }
    setOrderType(type)
  }

  /**
   * function for modif order
   */
  const sortByIndex = (a, b) => {
    const orderChange = orderType || cols[0].index
    if (order === 'asc') {
      // eslint-disable-next-line no-nested-ternary
      return a[orderChange] < b[orderChange]
        ? 1
        : b[orderChange] < a[orderChange]
        ? -1
        : 0
    }

    // eslint-disable-next-line no-nested-ternary
    return a[orderChange] > b[orderChange]
      ? 1
      : b[orderChange] > a[orderChange]
      ? -1
      : 0
  }

  /**
   * Find entries with search
   * @return  {array} with entries
   */
  const findEntries = () => {
    if (search.length > 2) {
      const find = data.filter((x) =>
        JSON.stringify(x).toLowerCase().includes(search.toLowerCase())
      )
      return find
    }
    return data
  }

  /**
   * Entries ordered
   */
  const newOrder = findEntries().sort(sortByIndex)

  /**
   * filter entries function entries perPage and active page
   * @return  {array} entries to show
   */
  const showEntries = newOrder.filter(
    (x, i) =>
      i >= innerPage * innerPerPage - innerPerPage &&
      i < innerPage * innerPerPage
  )

  return (
    <div className='tableEmployee'>
      <div className='tableEmployee__head'>
        <SelectEntries value={innerPerPage} onChange={setInnerPerPage} />
        <div className='tableEmployee__search'>
          <label htmlFor='searchEntries'>Search:</label>
          <input
            id='searchEntries'
            placeholder='Search employees'
            type='text'
            value={search}
            onChange={searchData}
          />
        </div>
      </div>
      <div className='tableEmployee__content'>
        <table className='tableEmployee__table'>
          <thead>
            <tr>
              {cols.map((col) => (
                <th
                  key={col.index}
                  role='button'
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      changeOrder(col.index)
                    }
                  }}
                  onClick={() => changeOrder(col.index)}>
                  <div className='tableEmployee__columnTitle'>
                    {col.label}
                    <Order
                      showUp={
                        orderType !== col.index ||
                        (orderType === col.index && order === 'desc')
                      }
                      showDown={
                        orderType !== col.index ||
                        (orderType === col.index && order === 'asc')
                      }
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {showEntries.map((ligne, i) => {
              if (i < innerPerPage) {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={i}>
                    {cols.map((col) => (
                      <td key={col.index}>{ligne[col.index]}</td>
                    ))}
                  </tr>
                )
              }
              return null
            })}
          </tbody>
        </table>
      </div>
      <div className='tableEmployee__nav'>
        <div className='tableEmployee__info'>
          Showing{' '}
          {data.length > 0 ? innerPage * innerPerPage + 1 - innerPerPage : 0} to{' '}
          {innerPage * innerPerPage < data.length
            ? innerPage * innerPerPage
            : data.length}{' '}
          of {data.length} entries
        </div>
        <div className='tableEmployee__pagination'>
          {innerPage > 1 && (
            <button type='button' tabIndex={-1} onClick={prev} className='prev'>
              Previous
            </button>
          )}
          <Pagination
            length={data.length}
            page={innerPage}
            updatePage={setInnerPage}
            totalPage={totalPage}
          />
          {innerPage < totalPage && (
            <button type='button' className='next' onClick={next}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

Table.propTypes = {
  cols: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  perPage: PropTypes.number,
  page: PropTypes.number,
}

Table.defaultProps = {
  perPage: 10,
  page: 1,
}
