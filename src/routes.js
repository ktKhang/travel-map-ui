import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const AboutUs = Loadable({
  loader: () => import('./views/AboutUs/AboutUs'),
  loading: Loading,
});

const YourAdventure = Loadable({
  loader: () => import('./views/YourAdventure/YourAdventure'),
  loading: Loading,
});

const Explore = Loadable({
  loader: () => import('./views/Explore/Explore'),
  loading: Loading,
});

const Save = Loadable({
  loader: () => import('./views/Save/Save'),
  loading: Loading,
});

const DashboardAdmin = Loadable({
  loader: () => import('./views/Admin/Dashboard'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./views/Admin/Users'),
  loading: Loading
});

const User = Loadable({
  loader: () => import('./views/Admin/User'),
  loading: Loading
})

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/save', name: 'Save', component: Save },
  { path: '/explore', name: 'Explore', component: Explore },
  { path: '/about', name: 'AboutUs', component: AboutUs },
  { path: '/adventure', name: 'YourAdventure', component: YourAdventure },
  { path: '/admin/dashboard', name: 'Dashboard', component: DashboardAdmin },
  { path: '/admin/users', name: 'Users', component: Users},
  { path: '/admin/userss/:uid', name: 'User Detail', component: User},
];

export default routes;
