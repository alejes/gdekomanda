import React from 'react'
import ReactDOM from 'react-dom'

export default ({ options, index, skills, selected, onChange }) => {
  return <select
      data-index={ index }
      className="form-control"
      onChange={ onChange }
      value={ selected.id }
    >
    { options.map((skill) => (
      <option
        value={ skill.id }
        key={ skill.id }
      >
        { skill.title }
      </option>
    )) }
  </select>
}
