import React from 'react';

export default class Otp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: '',
        redirect: false
      };
    }

    onSubmit(e) {
      e.preventDefault();

    }
    render() {
      return (
        <div className = "searchbox1">
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type="number" ref="otp" name="otp"  maxLength="5" placeholder="OTP"/>
              <button className="button">Confirm</button>
            </form>
        </div>
      );
    }
  }
