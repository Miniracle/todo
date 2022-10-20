import React from 'react'
import classes from './Select.module.css'
export default function MySelect({ options, defaultValue, value, onChange }) {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={classes.mySelect}
      >
        <option disabled value=''>
          {defaultValue}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
