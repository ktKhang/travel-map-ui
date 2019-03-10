import React, { Component } from 'react';
import loading from '../../assets/icons/ic-loading.gif'

class Save extends Component {

   render() {
      console.log();
      return (
         <div className="map-content">
            <div className="user-app-content">
               <div className="img-loading-content">
                  <img src={loading} alt="loading..." className="img-loading" />
               </div>
            </div>
         </div>
      );
   }
}

export default Save;