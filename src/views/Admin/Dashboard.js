import React, { Component } from 'react';
import GGMap from '../../utils/GGMap v2.0/GGMap';
class Dashboard extends Component {
   render() {
      return (
         <div style={{ height: window.innerHeight - 108, minHeight: '518px' }}>
            <div className="admin-app-content">
               <GGMap
                  className='admin-map'
               />
            </div>
         </div>
      );
   }
}

export default Dashboard;