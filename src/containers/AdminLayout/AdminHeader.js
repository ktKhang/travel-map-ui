import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/logo.svg'

const propTypes = {
   children: PropTypes.node,
};

const defaultProps = {};

class AdminHeader extends Component {
   render() {

      // eslint-disable-next-line
      const { children, ...attributes } = this.props;

      return (
         <React.Fragment>
            <AppSidebarToggler className="d-lg-none" display="md" mobile />
            <AppNavbarBrand style={{ width: '290px', background: '#13223B', borderBottom: '1px solid #1E344D' }}
               full={{ src: logo, width: 89, height: 30, alt: 'LOGO' }}
            />

            <Nav className="ml-auto" navbar>
               <AppHeaderDropdown direction="down">
                  <DropdownToggle nav>
                     <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </DropdownToggle>
                  <DropdownMenu right style={{ right: 'auto' }}>
                     <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                     <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
                     <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
                     <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
                     <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
                     <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
                     <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                     <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                     <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
                     <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
                     <DropdownItem divider />
                     <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
                     <DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>
                  </DropdownMenu>
               </AppHeaderDropdown>
            </Nav>
            <AppAsideToggler className="d-md-down-none" />
         </React.Fragment>
      );
   }
}

AdminHeader.propTypes = propTypes;
AdminHeader.defaultProps = defaultProps;

export default AdminHeader;
