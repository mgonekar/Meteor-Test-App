const Nexmo = require('nexmo');
import {Meteor} from 'meteor/meteor';
import {Otp} from '../api/db';
import random from 'random';

import moment from 'moment';
import { withTracker } from 'meteor/react-meteor-data';


export const newSms = (from, to) => {

  // Meteor.call('users.insertotp', 44444);
    const nexmo = new Nexmo({
        apiKey: 'apiKey',
        apiSecret: "apiSecret",
      },{debug:true});

    //   const from = from;
    //     const to = to;
        const text = 'hi manish'
        
        Meteor.call('users.insertotp', random.int(min = 10005, max = 99999), (error, result) => {
          if(error) {
            console.log('otp error', error);
          } else {
            console.log('otp res', result);
          }
         });

         Meteor.call('find-otp', text, (error, result) => {
          if(error) {
            console.log('otp error check', error);
          } else {
            console.log('otp res check', result);
          }
         });
        // nexmo.message.sendSms(from, to, text, (err, responseData) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         if(responseData.messages[0]['status'] === "0") {
        //             console.log("Message sent successfully.");
        //         } else {
        //             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        //         }
        //     }
        // })
};

export default withTracker(props => {
  return {
      otp: Otp.find().fetch()
  };
})(newSms);





// nexmo.channel.send(
//   { "type": "sms", "number": "+917276398731" },
//   { "type": "sms", "number": "NEXMO" },
//   {
//     "content": {
//       "type": "text",
//       "text": "This is an SMS sent from the Messages API"
//     }
//   },
//   (err, data) => { console.log(data.message_uuid); }
// );

