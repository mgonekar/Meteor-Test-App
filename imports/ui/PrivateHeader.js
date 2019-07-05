import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import {Link } from "react-router-dom";
import PropTypes from 'prop-types';

export const PrivateHeader = (props) => {
    return (
        <div className="header">
          <div className="header__content">
            <h1 className="header__title">{props.title}</h1>
            <ul>
              <li><Link to="/Add">Add</Link></li>
              <li><Link to="/signup">Images</Link></li>
              <li><Link to="/signup">Need an account?</Link></li>
            </ul>
            <button className="button button--link-text" onClick={() => props.handleLogout()}>Logout</button>
          </div>
        </div>
      );
    };

PrivateHeader.propTypes  = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired
};

export default withTracker(props => {
    return {
        handleLogout: () => Accounts.logout()
    };
})(PrivateHeader);
