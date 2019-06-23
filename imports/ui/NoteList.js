import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
// import { withTracker } from 'meteor/react-meteor-data';

// import { Notes } from '../api/db';

export const NoteList = (props) => {
    return (
        <div>
            {/* NoteList { props.notes.length } */}
        </div>
    );
};

// NoteList.propTypes = {
//     notes:  PropTypes.array.isRequired
// }

// export default withTracker(props => {
//     // Meteor.subscribe('notes');
//     // return {
//     //     notes: Notes.find().fetch()
//     // }
// })(NoteList);