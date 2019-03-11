import React, { Component } from 'react';
import Map from "./Map";
import ShareMap from "./ShareMap";
class Dashboard extends Component {
   render() {
      return (
         <div style={{ height: window.innerHeight - 108, minHeight: '518px' }}>
            <div className="app-content" style={{ width: '100%', height: '100%' }}>
               <Map style={{ width: '-webkit-fill-available', maxWidth: '-webkit-fill-available', webkitAnimationName: 'example' }}></Map>
            </div>
         </div>
      );
   }
}

export default Dashboard;