import { SimpleComponent } from 'components/shared/component';
import { useObserver } from 'mobx-react';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter } from 'react-router-dom';

export const OtherPage = hot(() => {
  return useObserver(() => (
    <HashRouter>

      <h1>Other page</h1>

      <p>Hello World!!!!!</p>

      <SimpleComponent />
    </HashRouter>
  ))
})