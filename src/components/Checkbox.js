import React from 'react'

export default props => 
    <input type="checkbox" checked={props.value || false} onChange={e => {
        props.onChange(e.target.checked)}} 
    />
