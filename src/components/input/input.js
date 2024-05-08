import React from 'react'
import PropTypes from 'prop-types'

export default function Input({type, value, name, onChange}) {
  return <input type={type} value={value} name={name} onChange={onChange}></input> 
}

// propTypes for guarding component params
Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}