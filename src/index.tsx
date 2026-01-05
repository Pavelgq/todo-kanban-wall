import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/index.css'
import { Provider } from 'react-redux'
import { App } from './pages/App'
import { store } from './store'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Failed to find the root element')
}

const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
