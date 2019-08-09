import "regenerator-runtime/runtime";
import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import SimpleComponent from '../components/component';
import { useTranslation, Trans } from "react-i18next";
import i18n from "i18next";

const IndexPage = hot(() => {

  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <SimpleComponent />
      API Address: {REACT_APP_API_URL}
    </div>
  )
})

export default IndexPage;
