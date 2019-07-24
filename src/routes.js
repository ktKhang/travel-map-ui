import React from 'react';
import Loadable from 'react-loadable'
import loading from './assets/icons/ic-loading.gif'
import DefaultLayout from './containers/DefaultLayout';
import { constant } from './utils/Constant';
import GGLoading from './utils/GGLoading';

function Loading() {
  return (
    <div className="map-content">
      <div className="app-content" style={{ height: '-webkit-fill-available', overflow: 'auto' }}>
        <GGLoading />
      </div>
    </div>
  );
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
  loader: () => import('./views/Admin/User/Users'),
  loading: Loading
});

const User = Loadable({
  loader: () => import('./views/Admin/User/User'),
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

const Albums = Loadable({
  loader: () => import('./views/Admin/User/Albums'),
  loading: Loading
})

const Videos = Loadable({
  loader: () => import('./views/Admin/User/Videos'),
  loading: Loading
})

const Posts = Loadable({
  loader: () => import('./views/Admin/User/Posts'),
  loading: Loading
})

const PostList = Loadable({
  loader: () => import('./views/Admin/PostList'),
  loading: Loading
})

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: constant.ROUTE_HOME, exact: true, name: 'Home', component: DefaultLayout },
  { path: constant.ROUTE_SAVE, exact: true, name: 'Save', component: Save },
  { path: constant.ROUTE_EXPLORE, exact: true, name: 'Explore', component: Explore },
  { path: constant.ROUTE_ABOUT, exact: true, name: 'AboutUs', component: AboutUs },
  { path: constant.ROUTE_ADVENTURE, exact: true, name: 'YourAdventure', component: YourAdventure },
  { path: constant.ROUTE_ADMIN_DASHBOARD, exact: true, name: 'Dashboard', component: DashboardAdmin },
  { path: constant.ROUTE_ADMIN_USERS, exact: true, name: 'Users', component: Users },
  { path: constant.ROUTE_ADMIN_USER_DETAIL, exact: true, name: 'User Detail', component: User },
  { path: constant.ROUTE_ADMIN_USER_POSTS, exact: true, name: 'Posts', component: Posts },
  { path: constant.ROUTE_ADMIN_USER_VIDEOS, exact: true, name: 'Videos', component: Videos },
  { path: constant.ROUTE_ADMIN_USER_ALBUMS, exact: true, name: 'Albums', component: Albums },
  { path: constant.ROUTE_ADMIN_REGIONS, exact: true, name: 'Regions', component: Regions },
  { path: constant.ROUTE_ADMIN_REGION_DETAIL, exact: true, name: 'Region Detail', component: Region },
  { path: constant.ROUTE_ADMIN_REGION_PLACES, exact: true, name: 'Places', component: Places },
  { path: constant.ROUTE_ADMIN_REGION_PLACE_DETAIL, exact: true, name: 'Place', component: Place },
  { path: constant.ROUTE_ADMIN_ADD_PLACE, exact: true, name: 'New Place', component: NewPlace },
  { path: constant.ROUTE_ADMIN_POST_LIST, exact: true, name: 'Post List', component: PostList }
];

export default routes;
