import React from 'react'

const elements=(length, page,totalPage)=>{
  const elts = []
    for (let i = 1; i <= totalPage; i++) {
    /**
     * When the length of pages it's under 6
     */
    if(length<=5){
      elts.push(i)
    }else{

      /**
       * Show first and last page
       * and when the active page it's in firstiest or lastiest pages
       */
      if(
        i===1
        || i===totalPage
        || i<5 && page < 4
        || i >= totalPage - 4 && page > totalPage-4
      ){
        elts.push(i)
      }

      /**
       * When it's a middle page active
       */
      if (i >= page - 1 && i<=page+1 && page <= totalPage - 4 && page >= 4){
        elts.push(i)
      }

      /**
       * When I add elipsis
       */
      if (
        i === 2 && page >= 5
        || i===totalPage -1 && page<=totalPage-4
        ){
        elts.push('…')
      }
    }
  }

  return elts
}

export default function Pagination({length, page, updatePage,totalPage})  {
  return <div className="paginationTable">
    {elements(length, page,totalPage).map((elt,i)=>
      Number.isInteger(elt) ?
        <button
          className={`paginationTable__page ${page===elt?'active':''}`}
          key={i}
          disabled={page===elt}
          onClick={()=>updatePage(elt)}>{elt}</button>
      :
        <div key={i}>{elt}</div>
      )}
  </div>
}
