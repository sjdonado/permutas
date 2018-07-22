import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, token, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            token ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
     />
);

PrivateRoute.propTypes = {
  auth: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  token: state.token
});

export default connect(mapStateToProps, null, null, {
    pure: false
})(PrivateRoute);