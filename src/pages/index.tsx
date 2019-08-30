import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, NavLink, BrowserRouter, HashRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Store from '../contexts/global'
import "../../i18n.ts";
import { NavHeader } from '../components/shared/header';
import MainPage from '../components/index/main';

declare global {
  var REACT_APP_API_URL: string;
}

const IndexPage = observer(() => {
  const { color, changeColor } = React.useContext(Store);

  return (
    <HashRouter>
      <NavHeader color={color}/>

      <Route path="/" exact component={MainPage} />

      <button onClick={changeColor}>Toggle color!</button>

    </HashRouter>
  )
})

ReactDOM.render(
  <IndexPage />,
  document.getElementById('root') as HTMLElement
);
