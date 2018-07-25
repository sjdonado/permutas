import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import { connect } from 'react-redux';

import {
  saveUser,
  deleteUser,
  saveToken,
  deleteToken
} from './../../redux';

import {
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
// routes config
import routes from '../../routes';
import DefaultHeader from './DefaultHeader';

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    const items = [
      {
        name: 'Inicio',
        url: '/dashboard',
        icon: 'icon-home',
      },
      {
        name: 'Mensajes',
        url: '/messages',
        icon: 'icon-speech',
        badge: {
          variant: 'info',
          text: '5',
        },
      }
    ];

    if (props.user.role === 'admin')
      items.push({
        name: 'Docentes',
        url: '/teachers',
        icon: 'icon-people',
      });
    this.state = {
      navigation: { items: items }
    }
  }
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader {...this.props} />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={this.state.navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                    <route.component {...this.props} />
                  )} />)
                    : (null);
                },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  token: state.token,
});

const mapDispatchToProps = {
  saveUser,
  deleteUser,
  saveToken,
  deleteToken,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);
