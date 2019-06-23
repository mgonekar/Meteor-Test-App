import React from 'react';
import {Link } from "react-router-dom";
import {Accounts} from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import moment from 'moment';

import {newSms} from './../api/sms';
import {Otp} from '../api/db';



 

export class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: ''
      };
    }
    onSubmit(e) {
      e.preventDefault();
  
      // let email = this.refs.email.value.trim();
      let Mnumber  = this.refs.mobile.value.trim();
      let password = this.refs.password.value.trim();
  
      if (password.length < 4) {
        return this.setState({error: 'Password must be more than 3 characters long'});
      }
      if (Mnumber.length !== 4) {
        return this.setState({error: 'Mobile number must be 10 characters long'});
      }

      if(!Mnumber.match(/^-{0,1}\d+$/)){
        return this.setState({error: 'Invalid Mobile number'});
      }
  
      this.props.createUser({username:Mnumber, password}, (err) => {
        if (err) {
          this.setState({error: err.reason});
        } else {
          this.setState({error: ''});
          newSms("NEXMO","+917276398731");
        }
      });
    }
    render() {
      return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Join</h1>
  
            {this.state.error ? <p>{this.state.error}</p> : undefined}
  
            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
              {/* <input type="email" ref="email" name="email" placeholder="Email"/> */}
              <input type="number" ref="mobile" name="mobile" placeholder="Mobile Number"/>
              <input type="password" ref="password" name="password" placeholder="Password"/>
              <button className="button">Create Account</button>
            </form>
  
            <Link to="/">Have an account?</Link>
          </div>
        </div>
      );
    }
  }

Signup.propTypes = {
    createUser: PropTypes.func.isRequired
}

export default withTracker(props => {
    return {
        createUser: Accounts.createUser
    };
})(Signup);