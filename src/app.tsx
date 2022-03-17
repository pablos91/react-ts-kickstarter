import { NavHeader } from 'components/header';
import { SampleContextProvider } from 'contexts/sampleContext';
import { ErrorBoundary } from 'error';
import "i18n.ts";
import { MainPage } from 'pages';
import { LoginPage } from 'pages/login';
import { OtherPage } from 'pages/other';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { HashRouter, Route } from 'react-router-dom';
import "./app.scss";

const App = hot(() => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <SampleContextProvider>
          <NavHeader />

          <Route path="/" exact component={MainPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/otherpage" exact component={OtherPage} />
        </SampleContextProvider>
      </HashRouter>
    </ErrorBoundary>
  )
})

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
