import React from 'react'
import ReactDOM from 'react-dom'

const wrapperStyle = {
  width: '100%',
  height: '480px',
  fontSize: '60px'
}

const preloaderStyle = {
  marginTop: '210px'
}

export default () => (
  <div className="text-center" style={ wrapperStyle }>
    <span
      className="glyphicon glyphicon-refresh glyphicon-refresh-animate"
      style={preloaderStyle}
    />
  </div>
)
