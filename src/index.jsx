import React from 'react';
import { render } from 'react-dom';

import SomeUi from './SomeUi';

function App() {
  return (
    <div>
      <p>Testing different react testing libraries</p>
      <SomeUi />
    </div>
  );
}

render(<App />, document.getElementById('root'));
