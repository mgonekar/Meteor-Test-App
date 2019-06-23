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
            updatedAt: moment().valueOf()
        });
    },
    'find-otp' (otp) {
        // if(!this.userId) {
        //     throw new Meteor.Error('not-authorized');
        //  }
         console.log('otpcheck', otp);
         return true;
        //  return Otp.find({
        //     userId: this.userId
        //  });
    }

});