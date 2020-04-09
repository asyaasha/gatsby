import React from 'react';
import Transition from '../components/Transition';
import Canvas from '../components/canvas';

import 'normalize.css';

export default ({ children, location }) => (
  <div>
    <Canvas />
    <Transition location={location}>{children}</Transition>
  </div>
);
