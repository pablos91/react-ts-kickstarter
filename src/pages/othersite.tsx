import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, NavLink, BrowserRouter, HashRouter } from 'react-router-dom';
import IndexPage from '../components/index/main';
import { observer } from 'mobx-react-lite';
import Store from '../contexts/global'
import "../../i18n.ts";
import { NavHeader } from '../components/shared/header';
import SimpleComponent from '../components/shared/component';
OfflinePluginRuntime.install({
  onUpdateReady: () => OfflinePluginRuntime.applyUpdate()
});

declare global {
  var REACT_APP_API_URL:string;
}

const OtherSite = hot(observer(() => {
  const { color } = React.useContext(Store);

  return (
    <HashRouter>
      <NavHeader color={color}/>

      <h1>Other page</h1>

      <p>Hello World!!!!!</p>

      <SimpleComponent />
    </HashRouter>
  )
}))

ReactDOM.render(
    <OtherSite/>,
  document.getElementById('root') as HTMLElement
);
