import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

// export const Notes = new Mongo.Collection('notes');
export const individualSms   = new Mongo.Collection('individualSms');

if(Meteor.isServer) {
    // Meteor.publish('All userKisan data', function () {
    //     return userKisandb.find({ userId: this.userId });
    // });
}

Meteor.methods({



});