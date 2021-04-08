import React from 'react'
import {up,down} from './svg'

export default function Order({showUp,showDown}){
  return <div className={`tableEmployee__order ${showUp!==showDown?'active':''}`}>
    {showUp && <div className="tableEmployee__up">
        {up}
      </div>}
    {showDown && <div className="tableEmployee__down" >
      {down}
  </div>}
</div>
}
