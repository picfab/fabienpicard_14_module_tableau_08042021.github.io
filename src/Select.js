import React from 'react'
export default function Select({value,onChange}){
  return <div className="select">
          <label htmlFor="nbEntries">Show</label>
          <select id="nbEntries" value={value} onChange={(e)=>onChange(e.target.value)}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <label htmlFor="nbEntries">entries</label>
        </div>
}
