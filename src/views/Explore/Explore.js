import React, { Component } from 'react';
import Map from '../FeatureComponents/Map';
import { Container } from 'react-grid-system';

class Explore extends Component {
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

export default Explore;