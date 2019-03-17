import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { userService } from '../../services'
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
import { constant } from '../../utils/Constant';
import { decodeJWT } from '../../utils/DecodeJWT';
class AdminLayout extends Component {

   componentDidMount() {
      const token = window.localStorage.getItem(constant.TOKEN_VARIABLE_NAME);
      if (token !== undefined && token !== null) {
         const decodedToken = decodeJWT.decodeToken(token);
         if (decodedToken.role !== constant.ROLE_ADMIN) {
            this.props.history.push('/');
         } else {
            userService.fetchUserDetail(decodedToken.sub).then(data => {
               if (data.errorCode !== 0) {
                  localStorage.removeItem(constant.TOKEN_VARIABLE_NAME);
                  this.props.history.push('/');
               } else {
                  if (data.data.role.roleName !== constant.ROLE_ADMIN) {
                     this.props.history.push('/');
                  }
               }
            })
         }
      } else {
         this.props.history.push('/');
      }
   }

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
               <main className="main" style={{ paddingTop: '55px', paddingBottom: '2%', marginRight: '-2%' }}>
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
            <AppFooter style={{ marginTop: '-3.8%' }}>
               <AdminFooter />
            </AppFooter>
         </div>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      regionReducer: state.regionReducer,
   }
}

export default connect(mapStateToProps)(AdminLayout);