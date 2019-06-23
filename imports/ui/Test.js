// const Nexmo = require('nexmo')

// const nexmo = new Nexmo({
//   apiKey: '7fbea895',
//   apiSecret: "lmxvi57R0ObsEJJR",
// },{debug:true});

// // nexmo.channel.send(
// //   { "type": "sms", "number": "+917276398731" },
// //   { "type": "sms", "number": "NEXMO" },
// //   {
// //     "content": {
// //       "type": "text",
// //       "text": "This is an SMS sent from the Messages API"
// //     }
// //   },
// //   (err, data) => { console.log(data.message_uuid); }
// // );

// const from = "NEXMO"
// const to = "7276398731"
// const text = 'A text message sent using the Nexmo SMS API'

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
import React from 'react';

import PrivateHeader from './PrivateHeader';

export default () => {

     return (
        <div>
            <PrivateHeader title= 'Test'/>
            <div className="page-content">
                Test content
            </div>
            
        </div>
            )
}