import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store/store';
import { LandingPage, Navbar, BrowsePage, CreatePage, DocumentPage, SignUp, ProfilePage, AccountPage } from './index';

const Routes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={LandingPage} path="/signin" />
      <Route path="/" component={Navbar}>
        <IndexRoute component={BrowsePage} />
        <Route component={AccountPage} path="account" />
        <Route component={CreatePage} path="create" />
        <Route component={SignUp} path="signup" />
        <Route component={DocumentPage} path="document/:id" />
        <Route component={ProfilePage} path="profile/:id" />
      </Route>
    </Router>
  </Provider>
);

export default Routes;
