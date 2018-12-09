import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
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
            <AppNavbarBrand style={{ width: '21.25%', background: '#13223B', borderBottom: '1px solid #1E344D' }}
               full={{ src: logo, width: 89, height: 30, alt: 'LOGO' }}
               minimized = {{ src: logo, width: 89, height: 30, alt: 'LOGO' }}
            />
            
            <Nav className="ml-auto" navbar>
               <AppHeaderDropdown direction="down">
                  <DropdownToggle nav>
                     <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </DropdownToggle>
                  <DropdownMenu right style={{ right: 'auto' }}>
                     <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
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
