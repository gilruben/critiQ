import React from 'react';
import { render } from 'react-dom';

import LandingPage from './components/landingPage/LandingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';

import './styles/main.css';

const App = props => (
  <div>
    <Navbar />
    <LandingPage />
    <SignUp />
    <Footer />
  </div>
);

render(<App />, document.getElementById('app'));
