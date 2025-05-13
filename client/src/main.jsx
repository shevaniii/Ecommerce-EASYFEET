import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './app/store.js'
import {Provider } from 'react-redux'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>,
  </Provider>
)
