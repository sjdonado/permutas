import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Account = Loadable({
  loader: () => import('./views/Account/Account'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard/Dashboard'),
  loading: Loading,
});

const Teachers = Loadable({
  loader: () => import('./views/Teachers/Teachers'),
  loading: Loading,
});

const Messages = Loadable({
  loader: () => import('./views/Messages/Messages'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/messages', exact: true, name: 'Messages', component: Messages },
  { path: '/account', exact: true, name: 'Account', component: Account },
  { path: '/teachers', exact: true, name: 'Teachers', component: Teachers }
];

export default routes;
