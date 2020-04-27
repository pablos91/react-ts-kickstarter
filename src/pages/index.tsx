import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import * as ReactDOM from 'react-dom';
import { Route, NavLink, BrowserRouter, HashRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Store from '../stores/global'
import "../i18n.ts";
import { NavHeader } from '../components/shared/header';
import MainPage from '../components/index/main';
import { useStores } from '../contexts';
OfflinePluginRuntime.install({
  onUpdateReady: () => { OfflinePluginRuntime.applyUpdate(); console.log('[SW] app updated'); }
});

declare global {
  var REACT_APP_API_URL: string;
}

const IndexPage = hot(observer(() => {
  const { globalCtx } = useStores();

  return (
    <BrowserRouter>
      <NavHeader color={globalCtx.color}/>

      <Route path="/" exact component={MainPage} />

      <button onClick={globalCtx.changeColor}>Toggle color!!!!!!!!!!</button>

    </BrowserRouter>
  )
}))

ReactDOM.render(
  <IndexPage />,
  document.getElementById('root') as HTMLElement
);
