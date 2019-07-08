import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

// export const Notes = new Mongo.Collection('notes');
export const userKisan   = new Mongo.Collection('userKisan');

if(Meteor.isServer) {
    Meteor.publish('userKisan', function () {
        return Otp.find({ userId: this.userId });
    });
}

Meteor.methods({
    'Add Kiasn data' (name,surname,
        adharcard,addess,Mnumber,landsize,tags,product) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
         }

        return userKisan.insert({
            name,
            surname,
            adharcard,
            addess,
            Mnumber,
            landsize,
            tags,
            userId: this.userId,
            updatedAt: moment().valueOf()
        }, function(err,docsInserted){
            return docsInserted;
        });
    },
    // 'find-otp' () {
    //     if(!this.userId) {
    //         throw new Meteor.Error('not-authorized');
    //      }
    //       return Otp.find({
    //         userId: this.userId
    //      }).fetch().map( (otp) => {
    //         return otp.otp
    //      });
    // },
    // 'update-otp' () {
    //     if(!this.userId) {
    //         throw new Meteor.Error('not-authorized');
    //      }

    //      Otp.update({
    //         userId: this.userId
    //     },{
    //         $set:{ isVerified: true }
    //     });

    //     //  Otp.update(userId:this.userId,
    //     //     { $set: { isVerified: true } });
    //     //  Tasks.update(taskId,
    //     //      { $set: { checked: setChecked } });
    //     //   Otp.update({
    //     //     userId: this.userId
    //     //  }),{$set: {"isVerified": "true"}}
    // },
    // 'checkOtp' () {
    //     if(!this.userId) {
    //         throw new Meteor.Error('not-authorized');
    //      }

    //      return Otp.find({
    //         userId: this.userId
    //      }).fetch().map( (isVerified) => {
    //         return isVerified.isVerified
    //      });
    // }

});