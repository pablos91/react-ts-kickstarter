import { useSampleContext } from 'contexts/sampleContext';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import './main.scss';

export const MainPage = () => {
  const { t, i18n } = useTranslation();


  const changeLanguage = lng => {
    //@ts-ignore
    i18n.changeLanguage(lng);
  };


  const [{ }, dispatch] = useSampleContext();

  return (
    <div className='main-page-container'>
      <div className="greetings-container"><h1>{t("welcome")}</h1></div>
      <button onClick={() => changeLanguage("pl")}>PL</button>
      <button onClick={() => changeLanguage("en")}>EN</button>
      <div className="additional-info-container">
        <button onClick={() => dispatch({ type: "changeColor" })}>Toggle color!!!!!!!!!!</button>
        <p>REACT_APP_API_URL: {process.env.REACT_APP_API_URL}</p>
      </div>
    </div>
  )
}