import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './scss/main.scss';
import {BrowserRouter} from 'react-router-dom';

import MasterPage from './pages/master';

ReactDOM.render(
  <BrowserRouter>
    <MasterPage/>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);