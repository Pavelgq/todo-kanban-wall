import React from 'react'
import ReactDOM from 'react-dom'
import './styles/global.css'
import './styles/index.css'
import { Provider } from 'react-redux'
import { App } from './pages/App'
import { store } from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
