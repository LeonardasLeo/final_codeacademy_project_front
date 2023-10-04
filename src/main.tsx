import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../features/states'
import {Provider} from "react-redux";

const store = configureStore({
    reducer: {
        states: userReducer
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
