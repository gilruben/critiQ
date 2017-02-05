import React from 'react';
import { render } from 'react-dom';

import LandingPage from './components/landingPage/LandingPage';

import './css/main.css';

const App = props => (
  <div>
    <LandingPage />
  </div>
);

render(<App />, document.getElementById('app'));
