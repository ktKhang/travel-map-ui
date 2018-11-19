import React, { Component } from 'react';
import Map from '../FeatureComponents/Map';

class YourAdventure extends Component {
   render() {
      return (
         <div className="map-content">
            <div className="app-content">
            </div>
            <Map />
         </div>
      );
   }
}

export default YourAdventure;