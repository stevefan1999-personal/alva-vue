import React from 'react'
import ReactDOM from 'react-dom'
import Vue from 'vue'
import { VuePlugin, VueWrapper } from 'vuera'
import { hot } from 'react-hot-loader'
import { Hello } from './hello'
import 'element-theme-default'

Vue.use(VuePlugin)

if (process.env.NODE_ENV === 'development') {
  const App = hot(module)(() => (
    <div>
      <span>Hello World!</span>
      <Hello />
    </div>)
  )

  ReactDOM.render(<App />, document.getElementById('app'))

  if (module.hot) module.hot.accept()
}

export * from './hello'
export * from 'element-react'
