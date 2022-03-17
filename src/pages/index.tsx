import { useSampleContext } from 'contexts/sampleContext';
import * as React from 'react';

export const MainPage = () => {

  const { dispatch } = useSampleContext();

  return (
    <>
      <h1>Welcome to MainPage!</h1>
      <button onClick={() => dispatch({ type: "changeColor" })}>Toggle color!!!!!!!!!!</button>
      <p>API_URL: {process.env.REACT_APP_API_URL}</p>
    </>
  )
}