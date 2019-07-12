import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import 'bulma/css/bulma.css';

import {imageDatadb} from '../api/imageData';
import {userKisan}   from '../api/userKisan';
import PrivateHeader from './PrivateHeader';

 class AllCustomers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: '',
        redirect: false
      };
    }
    
    render() {
      console.log('docsReadyYet',this.props.userKisan);
      let fileCursors = this.props.userKisan;
  
        let display = fileCursors.map((id, key) => {
          console.log('aaaaa',id._id);

    Meteor.call('Find data by Id ', id._id,(error, result) => {
      if(error){
          console.log("Add Kiasn data error ", error);
      } else {
          console.log("ksan res ", result);
      }
    });
          
          // let kdata = userKisan.find({ }).fetch(); // if i replace userKisan with imageDatadb this works
          // console.log('kdata',kdata);

          return <div key={key}>
            <img src={img.imageData}/>
            {/* {kdata} */}
          </div>
        })
      return (
        <div>
            <PrivateHeader title= 'All'/>
            {/* <image src=""/> */}
            {display}
        </div>
      );
    }
  }

  export default withTracker( ( props ) => {
    const filesHandle = Meteor.subscribe('userKisan');
    const docsReadyYet = filesHandle.ready();
    const userKisan = userKisan.find({}).fetch();
  
    return {
      docsReadyYet,
      userKisan,
    };
  })(AllCustomers);