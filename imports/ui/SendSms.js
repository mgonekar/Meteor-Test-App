import React, { Component } from 'react';
import PropTypes from "prop-types";

class SendSms extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            MseesageSent: false,
        };
    }

    propTypes = {
        Mnumber: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        All: PropTypes.string,
      }

      sendAll(e) {
          e.preventDefault();
        let smsText  = this.refs.smsText.value.trim();
                Meteor.call('Find all numbers',smsText,(err,resp) => {
                    //uderkisan.js
                    if(err){
                        console.log("send all numbers error2", err);
                      } else {
                        // console.log("send all numbers sucess", resp);
                      }
                })
      }

    render() {
        return (
            <div>
               <div className="field">
                    <div className="control">
                        <textarea className="textarea is-danger" ref="smsText" name="smsText" placeholder="Danger textarea"></textarea>
                        {/* <input type="text" className="textarea is-danger" ref="smsText" name="smsText" placeholder="Danger textarea"/> */}
                    </div>
                    <button onClick={this.sendAll.bind(this)}>Send</button>
                </div>
            </div>
        );
    }

}

export default SendSms;