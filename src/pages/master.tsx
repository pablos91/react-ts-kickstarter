import * as React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import IndexPage from '.';
import {Menu, Icon} from 'semantic-ui-react';
import OtherPage from './othersite';

class MasterPage extends React.Component {
  render() {

    return (
      <div>
        <header>
            <Menu color="blue" icon inverted>
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
        <Route path="/" exact component={IndexPage}/>
        <Route path="/otherpage" component={OtherPage}/>
      </div>
    );
  }
}

export default MasterPage;
