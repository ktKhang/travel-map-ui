import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
// sidebar nav config
import navigation from '../../_navAdmin';
// routes config
import routes from '../../routes';
import AdminFooter from './AdminFooter';
import AdminHeader from './AdminHeader';
import { connect } from 'react-redux';
import {
   AppFooter,
   AppHeader,
   AppSidebar,
   AppSidebarFooter,
   AppSidebarForm,
   AppSidebarHeader,
   AppSidebarNav,
} from '@coreui/react';
import Map from '../../views/Admin/Map';
class AdminLayout extends Component {
   render() {
      return (
         <div className="app">
            <AppHeader fixed style={{ position: 'fixed', display: 'inline-flex' }}>
               <AdminHeader />
            </AppHeader>
            <div className="app-body">
               <AppSidebar fixed display="lg">
                  <AppSidebarHeader />
                  <AppSidebarForm />
                  <div style={{ position: 'relative', display: 'initial', height: '500px', marginTop: '-110px' }}>
                     <AppSidebarNav navConfig={navigation} {...this.props} />
                  </div>
                  <AppSidebarFooter />
               </AppSidebar>
               <main className="main" style={{ paddingTop: '55px', paddingBottom: '2%'}}>
                  <div className="map-place">
                     <Switch>
                        {routes.map((route, idx) => {
                           return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                              <route.component {...props} />
                              )} />) : (null);
                           },
                        )}
                     <Redirect from="/admin" to="/admin/dashboard" />
                     </Switch>
                  </div>
               </main>
             
            </div>
            <AppFooter style={{marginTop: '-3.8%'}}>
               <AdminFooter/>
            </AppFooter>         
         </div>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
     regionReducer: state.regionReducer,
     pageReducer: state.pageReducer
   }
}

export default  connect(mapStateToProps)(AdminLayout);