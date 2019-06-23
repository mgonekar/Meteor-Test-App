import React from 'react';
import {Link } from "react-router-dom";
import Meteor from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export default class Otp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: ''
      };
    }
    
    // componentDidMount() {;
    //     this.otpTraker = Tracker.autorun (() => {
    //         // Meteor.subscribe('otp');
    //         // const links = Links.find({
    //         //     visible: Session.get('showVisible')
    //         // }).fetch();
    //         // this.setState({links});
    //       });
    // }

    // componentWillUnmount () {
    //     this.otpTraker.stop();
    // }


    onSubmit(e) {
      e.preventDefault();
  
      // let email = this.refs.email.value.trim();
      let otp = this.refs.otp.value.trim();
  
      if (otp.length !== 5) {
        return this.setState({error: 'Invalid Otp'});
      }
      if(!otp.match(/^-{0,1}\d+$/)){
        return this.setState({error: 'Invalid Otp'});
      }
      this.setState({error: ''});

      Meteor.call(findotp, otp, (error, result) => {
        if(error) {
          console.log('otp error check', error);
        } else {
          console.log('otp res check', result);
        }
       });
      // const otpCall = 
      // console.log('otpCall',otpCall);
      // check fro correct o5p from db
    }
    render() {
      return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Otp</h1>
  
            {this.state.error ? <p>{this.state.error}</p> : undefined}
  
            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type="number" ref="otp" name="otp"  maxLength="5" placeholder="OTP"/>
              <button className="button">Confirm</button>
            </form>
  
            <Link to="/signup">Signup account?</Link>
            <Link to="/dashboard">Dash</Link>
          </div>
        </div>
      );
    }
  }
