import * as React from 'react';
import { useParams } from 'react-router-dom';
import './other.scss';

export const OtherPage = () => {

  const { id } = useParams();

  return (
    <div className='other-page-container'>
      <div className="greetings-container">
        <h1>Welcome to OtherPage!</h1>
      </div>
      <div className="parameter-info-container">
        <p>Parameter from get is: {id ?? "NOT FOUND"}</p>
      </div>
    </div>
  )
}