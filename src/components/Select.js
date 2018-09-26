import React from 'react'

export default props => 
 <select type="select" {...props} value={props.value || ''} onChange={e => props.onChange(e)} >
  <option value=" ">Select Year</option>
  {props.options.map(opt => {
    return ( <option key={opt} value={opt}>{opt}</option>
      );
    })
  }
</select>
