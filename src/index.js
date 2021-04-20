import React, { useEffect,useState } from 'react'
import './styles.scss'
import Pagination from './Pagination'
import Order from './Order'
import Select from './Select'
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

  useEffect(()=>{
    if(page){
      setInnerPage(page)
    }
    if(perPage){
      setInnerPerPage(perPage)
    }
    if(!orderType && data.length>0){
      setOrderType(cols[0].index)
    }
  },[page,perPage,data])

  /**
   * eventListenr
   */
  const prev = ()=>setInnerPage(innerPage-1)
  const next = ()=>setInnerPage(innerPage+1)
  const searchData=(e)=>{
    setSearch(e.target.value)
  }
  const changeOrder = (type) =>{
    if(type!==orderType){
      setOrder('asc')
    }else{
      setOrder(order==='asc'?'desc':'asc')
    }
    setOrderType(type)
  }

  /**
   * function for modif order
   */
  const sortByIndex = (a,b)=>{
    let orderChange = orderType?orderType:cols[0].index
    if(order=== 'asc'){
      return (a[orderChange] < b[orderChange]) ? 1 : ((b[orderChange] < a[orderChange]) ? -1 : 0)
    }
    else{
      return (a[orderChange] > b[orderChange]) ? 1 : ((b[orderChange] > a[orderChange]) ? -1 : 0)
    }
  }

  /**
   * Find entries with search
   * @return  {array} with entries
   */
  const findEntries = () => {
    if(search.length > 2){
      const find = data.filter(x=> JSON.stringify(x).includes(search))
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
  const showEntries = newOrder.filter((x,i)=> i >= innerPage * innerPerPage - innerPerPage && i < innerPage * innerPerPage)

  return <div className="tableEmployee">
    <div className="tableEmployee__head">
      <Select value={innerPerPage} onChange={setInnerPerPage}/>
      <div className="tableEmployee__search">
        <label htmlFor="searchEntries">Search:</label>
        <input id="searchEntries" placeholder="Search employees" type='text' value={search} onChange={searchData}/>
      </div>
    </div>
    <div className="tableEmployee__content">
      <table className="tableEmployee__table">
        <thead>
          <tr>
            {cols.map((col, i) => <th key={i}>
                                    <div className="tableEmployee__columnTitle" onClick={()=>changeOrder(col.index)}>
                                      {col.label}
                                      <Order showUp={orderType!==col.index || (orderType===col.index && order==='desc')}
                                            showDown={orderType!==col.index || (orderType===col.index && order==='asc')}
                                        />
                                    </div>
                                  </th>
              )}
          </tr>
        </thead>
        <tbody>
          {showEntries.map((ligne,i)=>{
            if(i < innerPerPage){
              return <tr key={i}>{cols.map((col, i) => <td key={i}>{ligne[col.index]}</td>)}</tr>
            }
          })}
        </tbody>
      </table>
    </div>
    <div className="tableEmployee__nav">
          <div className="tableEmployee__info">Showing {data.length>0?innerPage * innerPerPage + 1 - innerPerPage:0} to {innerPage * innerPerPage < data.length ? innerPage * innerPerPage : data.length} of {data.length} entries</div>
          <div className="tableEmployee__pagination">
            {innerPage>1&&<button onClick={prev} className='prev'>Previous</button>}
            <Pagination length={data.length} page={innerPage} updatePage={setInnerPage} totalPage={totalPage}/>
            {innerPage < totalPage && <button className='next' onClick={next}>Next</button>}
          </div>
    </div>
  </div>
}
