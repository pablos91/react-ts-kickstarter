import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import MasterPage from './pages/master';

import './scss/main.scss';

declare global {
  var REACT_APP_API_URL:string;
}

ReactDOM.render(
  <BrowserRouter>
    <MasterPage/>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);