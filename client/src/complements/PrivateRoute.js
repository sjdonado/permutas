import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const token = localStorage.getItem('token');

const PrivateRoute = ({ component: Component, ...rest }) => (
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

export default PrivateRoute;