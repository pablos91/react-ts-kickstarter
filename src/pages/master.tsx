import * as React from 'react';
import { Route, NavLink } from 'react-router-dom';
import IndexPage from '.';
import { Menu, Icon } from 'semantic-ui-react';
import OtherPage from './othersite';
import { GlobalProvider, GlobalContext } from '../context/global';


const MasterPage = () => {
  const context = React.useContext(GlobalContext)

  return (
    <GlobalProvider>
      <div>
        <header>
          <Menu color={context.color} icon inverted>
            <Menu.Item link>
              <Icon name='bars' />&nbsp;React Typescript Sass Router
              </Menu.Item>
            <Menu.Item name='homepage' exact link as={NavLink} to="/">
              Strona główna
              </Menu.Item>
            <Menu.Item name='otherpage' link as={NavLink} to="/otherpage">
              Inna strona
              </Menu.Item>
          </Menu>
        </header>
        <Route path="/" exact component={IndexPage} />
        <Route path="/otherpage" component={OtherPage} />

        <button onClick={context.changeColor}>Toggle color!</button>
      </div>
    </GlobalProvider>

  )
}

export default MasterPage;
