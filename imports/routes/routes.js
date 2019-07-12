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
import Customers from '../ui/AllCustomers';
import AddMember from '../ui/AddMembers';

// const onEnterNotePage = (nextState) => {
//   Session.set('selectedNoteId', nextState.params.id);
// };
// const onLeaveNotePage = () => {
//   Session.set('selectedNoteId', undefined);
// };

const publicPage = function  () {
  if (Meteor.userId()) {
    console.log('publicPage', publicPage);
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
          <Route exact path = "/allcustomer" component={Customers} privacy="auth" onEnter={privatePage} />
          <Route exact path = "/add" component={AddMember} privacy="auth" onEnter={privatePage} />
          <Route exact path = "/test" component={Test} privacy="auth" onEnter={privatePage} />
          <Route component={NotFound}/>
        </Switch>
      {/* </Route> */}
  </Router>
);

export const onAuthChange = function (authenticated) {
   otpisVerified = false;
  console.log("isAuthenticated: ", authenticated);
  const path = browserHistory.location.pathname;
  console.log('path--', path);
  if(authenticated) {

    Meteor.call('checkOtp', (error, result) => {
      if(error) {
        console.log('otp error check', error);
      } else {
        console.log('otp update check isVerified', result.toString());
        otpisVerified = result.toString();

        if(otpisVerified == "true" && path === '/'){
          browserHistory.replace('/dashboard');
        }
        if(otpisVerified == "true" && path === '/otp'){
          browserHistory.replace('/dashboard');
        }
        // if(otpisVerified == "false" && path === '/'){
        //   browserHistory.replace('/otp');
        // }
        if(otpisVerified == "false"){
          browserHistory.replace('/otp');
        }
      }
    });

  } else {
    if(path === '/signup') {
      browserHistory.replace('/signup');
    } else  {
      browserHistory.replace('/');
    }
}

};

  //  if(authenticated) {

  //   if(path === '/' || path === '/otp') {
  //    console.log('otp error check path', otpisVerified);
  //    if(otpisVerified === "true") {
  //      browserHistory.replace('/dashboard');
  //   }
  //  }
  //  }
  
  
//   if (authenticated && isUnauthenticatedPage) {
//       console.log(`Authenticated user routed to the path /dashboard`);
//       if(path==='/') {
//         if(otpisVerified === false) {
//           browserHistory.replace('/otp');
//         } 
//         if(otpisVerified === true) {
//           browserHistory.replace('/dashboard');
//         } 
        
//       }
//       if(path==='/otp') {
//         if(otpisVerified === false) {
//           browserHistory.replace('/otp');
//         } 
//         if(otpisVerified === true) {
//           browserHistory.replace('/dashboard');
//         } 
        
//       }
//       if(path==='/signup') {
//         browserHistory.replace('/otp');
//       }
//   } else if (!authenticated && isAuthenticatedPage) {
//       console.log(`Unauthenticated user routed to the path /`);
//       if(path ==='/signup') {
//         browserHistory.replace('/signup');
//       } else {
//         browserHistory.replace('/');
//       }
      
//   }
// };