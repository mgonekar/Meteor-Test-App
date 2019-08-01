import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

// export const Notes = new Mongo.Collection('notes');
export const userKisandb   = new Mongo.Collection('userKisan');

if(Meteor.isServer) {
    Meteor.publish('All userKisan data', function () {
        return userKisandb.find({ userId: this.userId });
    });
}

Meteor.methods({
    'Add Kiasn data' (name,surname,
        adharcard,addess,Mnumber,landsize,tags,product) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
         }

        return userKisandb.insert({
            name,
            surname,
            adharcard,
            addess,
            Mnumber,
            landsize,
            tags,
            userId: this.userId,
            updatedAt: moment().valueOf(),
            product
        }, function(err,docsInserted){
            return docsInserted;
        });
    },
    
    'Find all numbers' (smsText) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
         }
         let counter = 0;
          return userKisandb.find({
            userId: this.userId
         }).fetch().map((Mob) => {
            // return Mob.Mnumber
            if(Mob.Mnumber) {
                Meteor.call('Send to all',Mob.Mnumber,smsText,(err,resp) => {
                  //sms.js
                  if(err){
                      console.log("send all numbers error2", err);
                    } else {
                      console.log("send all numbers sucess", resp);
                      if(true) { 
                          //****************remember to chnge true it to resp */
                          // if sucess save sms to db
                          
                          if(counter === 0) {
                            Meteor.call('Insert All sms data',smsText,counter,(err,resp) => {
                                //get inserted data id
                                //allSmsdb
                                if(err){
                                    console.log("Insert All sms data error", err);
                                  } else {
                                    console.log("Insert All sms data sucess counter ",counter);
                                    // console.log("Insert All sms data sucess", resp);
                                    //insert all sms id and kdta id
                                    counter++;
                                    console.log("counter",counter);
                                    Meteor.call('insert all and individual common sms to db', resp, Mob._id,(err,resp) => {
                                        //Add data id and mod.id in one place
                                        if(err){
                                            console.log("insert all and individual common sms to db error2", err);
                                          } else {
                                            console.log("insert all and individual common sms to db sucess", resp);
                                          }
                                    })
  
                                  }
                            });
                            
                          }
                          
                        //insert text id to db.........
                      }
                    }
              })
            }
            
         });
    },


});