import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
   children: PropTypes.node,
};

class AdminFooter extends Component {
   render() {

      return (
         <React.Fragment>
         <span><a href="#">TravelMap</a> &copy; 2018</span>
         <span className="ml-auto">Created by <a href="https://www.facebook.com/nguyenquanghuyqng">Huy</a> and <a href="https://www.facebook.com/kt.khanq">Khang</a>  </span>
         </React.Fragment>
      );
   }
}

AdminFooter.propTypes = propTypes;

export default AdminFooter;
