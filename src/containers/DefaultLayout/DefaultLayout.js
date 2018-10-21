import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import logo from '../../assets/img/brand/logo.svg'
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

class DefaultLayout extends Component {
  Logo(props) {
    return(
      <div className="logo">
        <img src={props.logo} width="100" height="50" />
    </div>
    )
  }

  Profile(){
    return(
      <div className="profile-login">
        {/* <Nav className="ml-custom" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
            <NavItem className="d-md-down-none">
              <NavLink href="#">Khang Le</NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink href="#">Logout</NavLink>
            </NavItem>
          </AppHeaderDropdown>
        </Nav> */}

        <Container>
          <Row>
            <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
          </Row>
          <Row>
            <div className="profile-name">
              <button className="btn btn-block btn-light btn-profile">Khang Le</button>
            </div>
            {/* <div>
            <Nav className="ml-custom" navbar>
                <NavItem className="d-md-down-none">
                  <NavLink href="#">Khang Le</NavLink>
                </NavItem>
                <NavItem className="d-md-down-none">
                  <NavLink href="#">Logout</NavLink>
                </NavItem>
            </Nav>
            </div> */}
            
          </Row>
          {/* <Row>
          <div>
              <button>
                  Logout
              </button>
            </div>
          </Row> */}
        </Container>
      </div>
    )
  }

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
            {/* <this.Logo/> */}
            <AppNavbarBrand
              full={{ src:'', width: '100%', height: 30, alt: 'LOGO' }}
            />

            <AppSidebarNav navConfig={navigation} {...this.props} />
            {/* <AppSidebarFooter /> */}
            <this.Profile/>
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
                <Redirect from="/" to="/map" />
              </Switch>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        {/* <AppFooter>
          <DefaultFooter />
        </AppFooter> */}
      </div>
    );
  }
}

export default DefaultLayout;
