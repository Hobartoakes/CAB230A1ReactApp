import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import reportWebVitals from './reportWebVitals';
import App from './App';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'



// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={Store}>
//       <App/>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// )

// use createRoot instead
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App/>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
