import React from 'react'

export default props => 
<span className="starRating" >
  <input onChange={(e)=>props.onChange(Number(e.target.value))} checked={props.value === 5} id="rating5" type="radio" name="rating" value={props.value || 5} />
  <label htmlFor="rating5">5</label>
  <input onChange={(e)=>props.onChange(Number(e.target.value))} checked={props.value === 4} id="rating4" type="radio" name="rating" value={props.value || 4} />
  <label htmlFor="rating4">4</label>
  <input onChange={(e)=>props.onChange(Number(e.target.value))} checked={props.value === 3} id="rating3" type="radio" name="rating" value={props.value || 3} />
  <label htmlFor="rating3">3</label>
  <input onChange={(e)=>props.onChange(Number(e.target.value))} checked={props.value === 2} id="rating2" type="radio" name="rating" value={props.value || 2} />
  <label htmlFor="rating2">2</label>
  <input onChange={(e)=>props.onChange(Number(e.target.value))} checked={props.value === 1} id="rating1" type="radio" name="rating" value={props.value || 1} />
  <label htmlFor="rating1">1</label>
</span>
