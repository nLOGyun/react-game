import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Snick from './pages/snick/main';
import Login from './pages/login/main';
import Register from './pages/login/register'
import Main from './pages/main/main'
import GameMain from './pages/saoLei/gameMain';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Route path="/" exact component={App}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/main" component={Main}/>
          <Route path="/games/saoLei" component={GameMain}/>
          <Route path="/games/snick" component={Snick}/>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
