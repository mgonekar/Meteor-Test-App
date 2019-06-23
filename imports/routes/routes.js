import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { Session } from 'meteor/session';

const browserHistory = createBrowserHistory();
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import Test from '../ui/Test';
import Otp from '../ui/OTP';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard','/test'];


// const onEnterNotePage = (nextState) => {
//   Session.set('selectedNoteId', nextState.params.id);
// };
// const onLeaveNotePage = () => {
//   Session.set('selectedNoteId', undefined);
// };

const publicPage = function  () {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};

const privatePage = function  () {
  if(! Meteor.userId()) {
    browserHistory.replace('/');
  }
};

// export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
//   const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
//   const isAuthenticatedPage = currentPagePrivacy === 'auth';

//   if (isUnauthenticatedPage && isAuthenticated) {
//     browserHistory.replace('/dashboard');
//   } else if (isAuthenticatedPage && !isAuthenticated) {
//     browserHistory.replace('/');
//   }
// };
// export const globalOnChange = (prevState, nextState) => {
//   globalOnEnter(nextState);
// };
// export const globalOnEnter = (nextState) => {
//   const lastRoute = nextState.routes[nextState.routes.length - 1];
//   Session.set('currentPagePrivacy', lastRoute.privacy);
// };

export const routes = (
  <Router history = {browserHistory}>
      {/* <Route onEnter={globalOnEnter} onChange={globalOnChange()}> */}
        <Switch>
          <Route exact path = "/" component={Login} privacy="unauth" onEnter={publicPage}/>
          <Route exact path = "/signup" component={Signup} privacy="unauth" onEnter={publicPage}/>
          <Route exact path = "/dashboard" component={Dashboard} privacy="auth" onEnter={privatePage}/>
          <Route exact path = "/otp" component={Otp} privacy="auth" onEnter={privatePage}/>
          <Route exact path = "/test" component={Test} privacy="auth" onEnter={privatePage} />
          <Route component={NotFound}/>
        </Switch>
      {/* </Route> */}
  </Router>
);

export const onAuthChange = function (authenticated) {
  console.log("isAuthenticated: ", authenticated);
  const path = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(path);
  const isAuthenticatedPage = authenticatedPages.includes(path);
  if (authenticated && isUnauthenticatedPage) {   // pages: /signup and /
      console.log(`Authenticated user routed to the path /dashboard`);
      browserHistory.replace('/otp'); 
  } else if (!authenticated && isAuthenticatedPage) {
      console.log(`Unauthenticated user routed to the path /`);
      browserHistory.replace('/');
  }
};