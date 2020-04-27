import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import 'scss/components/_simple.scss';

export const SimpleComponent = hot(() => {
  return (
    <div className="component">
      Komponent
    </div>
  )
})
