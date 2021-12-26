import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { registerMicroApps, start } from '../../../dist'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

const appList = [
  {
    name: 'vuex',
    activeRule: '/abc',
    container: '#micro-container',
    entry: 'http://localhost:8080',
  },
  {
    name: 'vuey',
    activeRule: '/efg',
    container: '#micro-container',
    entry: 'http://localhost:8081',
  },
]

registerMicroApps(appList)
start()
