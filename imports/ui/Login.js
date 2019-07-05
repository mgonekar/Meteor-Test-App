import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Link } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: ''
      };
    }
    onSubmit(e) {
      e.preventDefault();
  
      let mnumber = this.refs.mnumber.value.trim();
      let password = this.refs.password.value.trim();
  
      this.props.loginWithPassword({username:mnumber}, password, (err) => {
        if (err) {
          this.setState({error: 'Unable to login. Check email and password.'});
        } else {
          this.setState({error: ''});
          // document.location.href="/dashboard";
        }
      });
    }
    render() {
      return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Login</h1>
  
            {this.state.error ? <p>{this.state.error}</p> : undefined}
  
            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type="number" ref="mnumber" name="mnumber" placeholder="Mobile Number"/>
              <input type="password" ref="password" name="password" placeholder="Password"/>
              <button className="button">Login</button>
            </form>
  
            <Link to="/signup">Need an account?</Link>
          </div>
        </div>
      );
    }
  }

Login.propTypes = {
    loginWithPassword: PropTypes.func.isRequired
}

export default withTracker(props => {
    return {
        loginWithPassword: Meteor.loginWithPassword
    };
})(Login);