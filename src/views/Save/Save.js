import React, { Component } from 'react';
import loading from '../../assets/icons/ic-loading.gif'
import GGLoading from '../../utils/GGLoading';

class Save extends Component {

   render() {
      console.log();
      return (
         <div className="map-content">
            <div className="user-app-content">
               <GGLoading />
            </div>
         </div>
      );
   }
}

export default Save;