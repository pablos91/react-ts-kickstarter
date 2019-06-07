import * as React from 'react';
import { Route, NavLink } from 'react-router-dom';
import IndexPage from '.';
import OtherPage from './othersite';
import { observer } from 'mobx-react-lite';
import Store from '../contexts/global'

const MasterPage = observer(() => {
  const { color, changeColor } = React.useContext(Store);

  return (
    <div>
      <header style={{ "background": color }}>
        <img src={require('../images/logo.png')} className="logo" />
        {/* remember to use require when linking to binaries. webpack will make proper transformations to it */}
        <NavLink to="/"> Strona główna </NavLink>
        <NavLink to="/otherpage"> Inna strona </NavLink>

      </header>
      <Route path="/" exact component={IndexPage} />
      <Route path="/otherpage" component={OtherPage} />

      <button onClick={changeColor}>Toggle color!</button>
    </div>

  )
})

export default MasterPage;
