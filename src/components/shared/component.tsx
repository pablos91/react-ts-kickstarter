import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import './components.scss';

const SimpleComponent = hot(() => {
  return(
    <div className="component">
      Komponent
    </div>
  )
})

export default SimpleComponent;
