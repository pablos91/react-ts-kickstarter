import { useSampleContext } from 'contexts/sampleContext';
import * as React from 'react';
import './main.scss';

export const MainPage = () => {

  const [{ }, dispatch] = useSampleContext();

  return (
    <div className='main-page-container'>
      <div className="greetings-container"><h1>Welcome to MainPage!</h1></div>
      <div className="additional-info-container">
        <button onClick={() => dispatch({ type: "changeColor" })}>Toggle color!!!!!!!!!!</button>
        <p>REACT_APP_API_URL: {process.env.REACT_APP_API_URL}</p>
      </div>
    </div>
  )
}