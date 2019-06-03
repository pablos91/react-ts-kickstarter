import * as React from 'react';
import { Route, NavLink } from 'react-router-dom';
import IndexPage from '.';
import OtherPage from './othersite';
import { observer } from 'mobx-react-lite';
import Store from '../context/global'

const MasterPage = observer(() => {
  const { color, changeColor } = React.useContext(Store);

  return (
    <div>
      <header style={{ "background": color }}>

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
