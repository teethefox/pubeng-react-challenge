import React from 'react'

export default props => 
// displays section for movie ratings
// attempted to condense each button into one dynamic map but radio buttons did not respond well so each is its own input field
<span className="starRating" >
  <input onChange={(e)=>props.onChange(Number(e.target.value))} checked={props.value === 5} id="rating5" type="radio" name="rating" value={5} />
  <label htmlFor="rating5">5</label>
  <input onChange={(e)=>props.onChange(Number(e.target.value))} checked={props.value === 4} id="rating4" type="radio" name="rating" value={4} />
  <label htmlFor="rating4">4</label>
  <input onChange={(e)=>props.onChange(Number(e.target.value))} checked={props.value === 3} id="rating3" type="radio" name="rating" value={3} />
  <label htmlFor="rating3">3</label>
  <input onChange={(e)=>props.onChange(Number(e.target.value))} checked={props.value === 2} id="rating2" type="radio" name="rating" value={2} />
  <label htmlFor="rating2">2</label>
  <input onChange={(e)=>props.onChange(Number(e.target.value))} checked={props.value === 1} id="rating1" type="radio" name="rating" value={1} />
  <label htmlFor="rating1">1</label>
</span>
