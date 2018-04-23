import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

class IndexPage extends React.Component {
  render() {

    return (
      <BrowserRouter>
        <main>Strona startowa</main> 
      </BrowserRouter>
    );
  }
}

export default IndexPage;
