import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store/store';
import { LandingPage, Navbar, BrowsePage, CreatePage, DocumentPage, SignUp, ProfilePage, Verification } from './index';

const Routes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={LandingPage} path="/signin" />
      <Route path="/" component={Navbar} onEnter={Verification} >
        <IndexRoute component={BrowsePage} />
        {/* <Route component={} path="account" /> */}
        <Route component={CreatePage} path="create" />
        <Route component={SignUp} path="signup" />
        <Route component={DocumentPage} path="document/:id" />
        <Route component={ProfilePage} path="profile/:id" />
      </Route>
    </Router>
  </Provider>
);

export default Routes;
