import { useObserver } from 'mobx-react';
import * as React from 'react';

export const OtherPage = () => {
  return useObserver(() => (
    <>
      <h1>Other page</h1>
      <p>Hello World!!!!!</p>
    </>
  ))
}