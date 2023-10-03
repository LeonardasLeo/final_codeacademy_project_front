import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../features/users'
import {Provider} from "react-redux";

const store = configureStore({
    reducer: {
        users: userReducer
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
