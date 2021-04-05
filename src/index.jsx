import React from 'react'
import { render } from 'react-dom'
// redux
import { Provider } from 'react-redux'
import store from '@/redux/store.js'
// components
import App from '@/App'
// styles
import '@/assets/scss/index.scss'

const rootElement = document.getElementById('root')

render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  rootElement
)
