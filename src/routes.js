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

const Regions = Loadable({
  loader: () => import('./views/Admin/Region/Regions'),
  loading: Loading
})

const Region = Loadable({
  loader: () => import('./views/Admin/Region/Region'),
  loading: Loading
})

const Places = Loadable({
  loader: () => import('./views/Admin/Place/Places'),
  loading: Loading
})

const Place = Loadable({
  loader: () => import('./views/Admin/Place/Place'),
  loading: Loading
})

const NewPlace = Loadable({
  loader: () => import('./views/Admin/Place/NewPlace'),
  loading: Loading
})

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/save', exact: true, name: 'Save', component: Save },
  { path: '/explore', exact: true, name: 'Explore', component: Explore },
  { path: '/about', exact: true, name: 'AboutUs', component: AboutUs },
  { path: '/adventure', exact: true, name: 'YourAdventure', component: YourAdventure },
  { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: DashboardAdmin },
  { path: '/admin/users', exact: true, name: 'Users', component: Users },
  { path: '/admin/user/:uid', exact: true, name: 'User Detail', component: User },
  { path: '/admin/regions', exact: true, name: 'Regions', component: Regions },
  { path: '/admin/region/:uid', exact: true, name: 'Region Detail', component: Region },
  { path: '/admin/region/:regionid/places', exact: true, name: 'Places', component: Places },
  { path: '/admin/region/:regionid/place/:uid', exact: true, name: 'Place', component: Place },
  { path: '/admin/region/:regionid/createNewPlace', exact: true, name: 'Places', component: NewPlace }
];

export default routes;
