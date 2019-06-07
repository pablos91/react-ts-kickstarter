import * as React from 'react';
import SimpleComponent from '../components/component';
import { useTranslation, Trans } from "react-i18next";
import i18n from "i18next";

const IndexPage = () => {

  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <SimpleComponent />

    </div>
  )
}

export default IndexPage;
