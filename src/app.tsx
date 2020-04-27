import { NavHeader } from 'components/shared/header';
import { useStores } from 'contexts';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { OtherPage } from 'pages/other';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route } from 'react-router-dom';
import { MainPage } from 'src/pages';
import "../i18n.ts";

OfflinePluginRuntime.install({
  onUpdateReady: () => { OfflinePluginRuntime.applyUpdate(); console.log('[SW] app updated'); }
});

declare global {
  var REACT_APP_API_URL: string;
}

const App = hot(() => {
  const { globalCtx } = useStores();

  return (
    <BrowserRouter>
      <NavHeader color={globalCtx.color} />

      <Route path="/" exact component={MainPage} />
      <Route path="/otherpage" exact component={OtherPage} />

    </BrowserRouter>
  )
})

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
