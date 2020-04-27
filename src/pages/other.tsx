import { SimpleComponent } from 'components/shared/component';
import { useObserver } from 'mobx-react';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';

export const OtherPage = hot(() => {
  return useObserver(() => (
    <>
      <h1>Other page</h1>

      <p>Hello World!!!!!</p>
      {window.supadupafly()}

      <SimpleComponent />
    </>
  ))
})