import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import logo from '../../assets/img/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import { Container, Row, Col } from 'react-grid-system';
import LoginProfile from './LoginProfile';
import SearchBox from '../../views/FeatureComponents/Search'

class DefaultLayout extends Component {
  Logo = () => {
    return (
      <div>
        <img className="logo" src={logo} width="100" height="50" alt="gogo.vn" />
      </div>
    )
  }

  // Profile(){
  //   let profileContent = '';

  //   if(this.state.isLoggedIn){
  //     profileContent = null;
  //   }else{
  //     profileContent = (<FacebookLogin
  //       appId="284174652429987"
  //       autoLoad={true}
  //       fields="name,email,picture"
  //       onClick={this.componentClicked}
  //       callback={this.responseFacebook} />)
  //   }
  //   return(
  //     <div className="profile-login">
  //       <Container>
  //         <Row>
  //           <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
  //         </Row>
  //         <Row>
  //           <div className="profile-name">
  //             <button className="btn btn-block btn-light btn-profile">Khang Le</button>
  //           </div>
  //         </Row>
  //       </Container>
  //     </div>
  //   )
  // }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            {/* <AppSidebarMinimizer /> */}
            <this.Logo />
            <SearchBox />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            {/* <AppSidebarFooter /> */}
            <LoginProfile />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes}/> */}
            <Switch>
              {routes.map((route, idx) => {
                return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                  <route.component {...props} />
                )} />)
                  : (null);
              },
              )}
              <Redirect from="/" to="/about" />
            </Switch>
          </main>
        </div>
        {/* <AppFooter>
          <DefaultFooter />
        </AppFooter> */}
      </div>
    );
  }
}

export default DefaultLayout;
