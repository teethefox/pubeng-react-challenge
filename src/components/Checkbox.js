import React from 'react'

export default props => 
    <input type="checkbox" onChange={e => {
        props.onChange(e.target.checked)}} 
    />
