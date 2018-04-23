import * as React from 'react';
import { Route, NavLink, BrowserRouter, Switch } from 'react-router-dom'
import { observer } from 'mobx-react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import SimpleComponent from './components/component';
import IndexPage from './pages';

import './scss/main.scss';

@observer
class App extends React.Component {
  render() {
    let wallets = [
      {
        "id": "bitcoin1",
        "type": "bitcoin",
        "rpcuser": "pablito",
        "rpcpass": "ppp",
        "host": "127.0.0.1",
        "port": "8332",
        "name": "Bitcoin Wallet"
      }
    ]

    return (
      <BrowserRouter>
        <div className="app">
            <Route path="/" exact={true} component={IndexPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
