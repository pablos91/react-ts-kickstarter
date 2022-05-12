import { NavHeader } from 'components/header';
import { SampleContextProvider } from 'contexts/sampleContext';
import { ErrorBoundary } from 'error';
import "i18n.ts";
import { LoginPage } from 'pages/login';
import { MainPage } from 'pages/main';
import { OtherPage } from 'pages/other';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { HashRouter, Route, Routes } from 'react-router-dom';
import "./app.scss";

const App = hot(() => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <SampleContextProvider>
          <NavHeader />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/otherpage/:id" element={<OtherPage />} />
          </Routes>
        </SampleContextProvider>
      </HashRouter>
    </ErrorBoundary>
  )
})

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
