import { useObserver } from 'mobx-react';
import * as React from 'react';
import { useStores } from '../ui/shared/sharedLogic';

export const MainPage = () => {
  const { globalCtx } = useStores();

  return useObserver(() => (
    <>
      <h1>Welcome to MainPage!</h1>
      <button onClick={globalCtx.changeColor}>Toggle color!!!!!!!!!!</button>
      <p>API_URL: {process.env.REACT_APP_API_URL}</p>
    </>
  ))
}