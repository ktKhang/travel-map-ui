import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
// sidebar nav config
import navigation from '../../_navAdmin';
// routes config
import routes from '../../routes';
import AdminFooter from './AdminFooter';
import AdminHeader from './AdminHeader';

import {
   AppAside,
   AppFooter,
   AppHeader,
   AppSidebar,
   AppSidebarFooter,
   AppSidebarForm,
   AppSidebarHeader,
   AppSidebarMinimizer,
   AppSidebarNav,
} from '@coreui/react';

class AdminLayout extends Component {
   render() {
      return (
         <div className="app">
            <AppHeader fixed style={{ position: 'fixed', display: 'inline-flex' }}>
               <AdminHeader />
            </AppHeader>
            <div className="app-body">
               <AppSidebar fixed display="lg" >
                  <AppSidebarHeader />
                  <AppSidebarForm />
                  <div style={{ position: 'relative', display: 'initial', height: '500px', marginTop: '-110px' }}>
                     <AppSidebarNav navConfig={navigation} {...this.props} />
                  </div>
                  <AppSidebarFooter />
               </AppSidebar>
               <main className="main" style={{ paddingTop: '57px' }}>
                  <Container fluid>
                     <Switch>
                        {routes.map((route, idx) => {
                           return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                              <route.component {...props} />
                           )} />)
                              : (null);
                        },
                        )}
                        <Redirect from="/admin" to="/admin/dashboard" />
                     </Switch>

                  </Container>
               </main>

            </div>

         </div>
      );
   }
}

export default AdminLayout;