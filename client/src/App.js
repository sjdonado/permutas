import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';

import { connect } from 'react-redux';

import {
  saveUser,
  deleteUser,
  saveToken,
  deleteToken,
  saveCurrentUser,
  deleteCurrentUser
} from './redux';

// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register } from './views/Pages';

// import { renderRoutes } from 'react-router-config';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={() => <Login {...this.props} />} />
          <Route exact path="/register" name="Register Page" component={() => <Register {...this.props} />} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Home" render={props => this.props.token != null ? (<DefaultLayout {...props} />) : (<Redirect to="/login" />)} />
          <Route path="/teachers" name="Teachers" render={props => this.props.user.role === 'admin' ? (<DefaultLayout {...props} />) : (<Redirect to="/" />)} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  token: state.token,
  currentUser: state.currentUser,
});

const mapDispatchToProps = {
  saveUser,
  deleteUser,
  saveToken,
  deleteToken,
  saveCurrentUser,
  deleteCurrentUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
