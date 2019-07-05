import React from 'react';
import PrivateHeader from './PrivateHeader';

let image = './Images/download.png';
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
            <PrivateHeader title= 'Add'/>
         <img src={image}/>
        </div>
      );
    }
  }