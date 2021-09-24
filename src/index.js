import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Snick from './pages/snick/main';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Route path="/" exact component={App}/>
          <Route path="/snick" component={Snick}/>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);