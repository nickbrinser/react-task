import React from 'react'
import './InputAlert.css'

export const InputAlert = ({ placeholder, handleChange }) => (
  <input
    className='alert-threshold'
    type='number'
    placeholder={placeholder}
    onChange={handleChange}
  />
)
