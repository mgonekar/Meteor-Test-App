import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

// export const Notes = new Mongo.Collection('notes');
export const allSms   = new Mongo.Collection('allSms');

if(Meteor.isServer) {
    Meteor.publish('All allSms data', function () {
        return allSms.find({ userId: this.userId });
    });
}

Meteor.methods({
    'Insert All sms data' (smstext,counter) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
         }
         if(counter === 0) {
            console.log("Insert All sms data inserted +++++",counter);
            return allSms.insert({
                smstext,
                userId: this.userId,
                updatedAt: moment().valueOf(),
            });
         }
         
    },
    
    
});