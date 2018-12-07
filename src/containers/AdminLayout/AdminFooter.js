import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
   children: PropTypes.node,
};

const linkPage = "/#/about";

const defaultProps = {};


class AdminFooter extends Component {
   render() {

      // eslint-disable-next-line
      const { children, ...attributes } = this.props;

      return (
         <React.Fragment>
            <span><a href={linkPage}>TravelMap</a> &copy; 2018</span>
            <span className="ml-auto">Created by <a href="https://coreui.io/react">Khang</a> and <a href="https://coreui.io/react">Huy</a></span>
         </React.Fragment>
      );
   }
}

AdminFooter.propTypes = propTypes;
AdminFooter.defaultProps = defaultProps;

export default AdminFooter;
