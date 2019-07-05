import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

// export const Notes = new Mongo.Collection('notes');
export const Otp   = new Mongo.Collection('otp');

if(Meteor.isServer) {
    Meteor.publish('otp', function () {
        return Otp.find({ userId: this.userId });
    });
}

Meteor.methods({
    'users.insertotp' (otp) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
         }

        return Otp.insert({
            otp,
            userId: this.userId,
            updatedAt: moment().valueOf(),
            isVerified: false
        });
    },
    'find-otp' () {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
         }
          return Otp.find({
            userId: this.userId
         }).fetch().map( (otp) => {
            return otp.otp
         });
    },
    'update-otp' () {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
         }

         Otp.update({
            userId: this.userId
        },{
            $set:{ isVerified: true }
        });

        //  Otp.update(userId:this.userId,
        //     { $set: { isVerified: true } });
        //  Tasks.update(taskId,
        //      { $set: { checked: setChecked } });
        //   Otp.update({
        //     userId: this.userId
        //  }),{$set: {"isVerified": "true"}}
    },
    'checkOtp' () {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
         }

         return Otp.find({
            userId: this.userId
         }).fetch().map( (isVerified) => {
            return isVerified.isVerified
         });
    }

});