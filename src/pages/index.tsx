import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

class IndexPage extends React.Component {

  componentDidMount(){
    alert(1);
  }

  render() {

    return (
        <main>
          
          Strona startowa

          <img src={require('../images/logo.png')} />

        </main> 
        
    );
  }
}

export default IndexPage;
