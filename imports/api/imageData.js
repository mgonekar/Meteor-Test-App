import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

// export const Notes = new Mongo.Collection('notes');
export const imageDatadb   = new Mongo.Collection('imageDatadb');

if(Meteor.isServer) {
    Meteor.publish('All image data', function () {
        return imageDatadb.find({ userId: this.userId });
    });
}

Meteor.methods({
    'Add Image data' (imageData,kUserrId,uploadimgId) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
         }

        return imageDatadb.insert({
            imageData,
            kUserrId,
            uploadimgId,
            userId: this.userId,
            updatedAt: moment().valueOf()
        }, function(err,docsInserted){
            return docsInserted;
        });
    },
    'Find data by Id '(id) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
         }
         imageDatadb.find({ }).fetch();
    }

});