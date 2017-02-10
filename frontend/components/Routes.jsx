import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store/store';

import { LandingPage, Navbar, BrowsePage, CreatePage, DocumentPage, MyAccount, SignUp } from './index';

const Routes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={LandingPage} path="/signin" />
      <Route path="/">
        <IndexRoute component={Navbar} />
        <Route component={MyAccount} path="account" />
        <Route component={BrowsePage} path="browse" />
        <Route component={CreatePage} path="create" />
        <Route component={SignUp} path="signup" />
        {/* <Route component={} path="document/:id" /> */}
        <Route component={DocumentPage} path="document/:id" />
        {/* <Route component={} path=":id" /> */}
      </Route>
    </Router>
  </Provider>
);

export default Routes;
