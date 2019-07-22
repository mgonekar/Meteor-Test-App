import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import 'bulma/css/bulma.css';

import {imageDatadb} from '../api/imageData';
import {userKisandb}   from '../api/userKisan';
import PrivateHeader from './PrivateHeader';
import SendSms from './SendSms';

 class AllCustomers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: '',
        redirect: false
      };
    }
    
    render() {
      let kdataCursor = this.props.userKisan;
  
        // Run through each file that the user has stored
        // (make sure the subscription only sends files owned by this user)
        let display = kdataCursor.map((data, key) => {
          let kdata = imageDatadb.find({kUserrId:data._id}).fetch().map((imgdata, key) => {
            return <div key={key}><img src={imgdata.imageData}/></div>
          })
          
          return <div key={key}>
            {kdata}
            <div>{data.name}</div>
            <div>{data.surname}</div>
            <div>{data.adharcard}</div>
            <div>{data.addess}</div>
            <div>{data.Mnumber}</div>
            <div>{data.landsize}</div>
            <div>{data.tags}</div>
            <div>{data.product}</div>
            <button>Send</button>
          </div>
        })
      return (
        <div>
            <PrivateHeader title= 'All'/>
            <h2>Send Messages to all.</h2>
            <div><SendSms/></div>
            {display}
        </div>
      );
    }
  }

  export default withTracker( ( props ) => {
    const filesHandle = Meteor.subscribe('All image data');
    const docsReadyYet = filesHandle.ready();
    const imageData = imageDatadb.find({}).fetch();

    const filesHandle1 = Meteor.subscribe('All userKisan data');
    const docsReadyYet1 = filesHandle1.ready();
    const userKisan = userKisandb.find({}).fetch();
    return {
      docsReadyYet,
      imageData,
      docsReadyYet1,
      userKisan
    };
  })(AllCustomers);