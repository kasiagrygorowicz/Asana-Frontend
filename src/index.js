import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthContextProvider} from "./store/auth-context";
import {Provider} from "react-redux";
import store from "./store/store";

ReactDOM.render(
    <Provider store={store}>
      <AuthContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AuthContextProvider>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
