import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap';

ReactDOM.render(
    <div className="container">
        <p>Comment icon: <span className="glyphicon glyphicon-comment"></span></p> 
    </div>,
    document.getElementById('root') as HTMLElement
  );