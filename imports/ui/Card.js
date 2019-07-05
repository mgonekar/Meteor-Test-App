import React from 'react';

// let image = './Images/download.png';
export default class Otp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: '',
        redirect: false
      };
    }
    
    render() {
        
      return (
        <div>
         {/* <img src={image}/> */}
        </div>
      );
    }
  }