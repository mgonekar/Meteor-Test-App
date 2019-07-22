import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

// export const Notes = new Mongo.Collection('notes');
export const commonSmsCollection   = new Mongo.Collection('commonSmsCollection');

if(Meteor.isServer) {
    // Meteor.publish('All userKisan data', function () {
    //     return userKisandb.find({ userId: this.userId });
    // });
}

Meteor.methods({
    'insert all and individual common sms to db' (smstextId,kisanId) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
         }

        return commonSmsCollection.insert({
            smstextId,
            kisanId,
            userId: this.userId,
            updatedAt: moment().valueOf(),
        }, function(err,docsInserted){
            if(!err){
                console.log("Sucess");
                return "Sucess";
            }
            
        });
    },


});