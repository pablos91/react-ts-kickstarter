import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, NavLink, BrowserRouter, HashRouter } from 'react-router-dom';
import IndexPage from '../components/index/main';
import { observer } from 'mobx-react-lite';
import Store from '../stores/global'
import "../i18n.ts";
import { NavHeader } from '../components/shared/header';
import SimpleComponent from '../components/shared/component';
import { useStores } from '../contexts';
OfflinePluginRuntime.install({
  onUpdateReady: () => { OfflinePluginRuntime.applyUpdate(); console.log('[SW] app updated'); }
});

declare global {
  var REACT_APP_API_URL:string;
}

const OtherSite = hot(observer(() => {
  const { globalCtx } = useStores();

  return (
    <HashRouter>
      <NavHeader color={globalCtx.color}/>

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
