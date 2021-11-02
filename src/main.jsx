import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ColorPicker from './colorPicker'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ColorPicker />
  </React.StrictMode>,
  document.getElementById('root')
)
