import React, { Component } from 'react';
import Map from '../FeatureComponents/Map';

class AboutUs extends Component {
   constructor(props) {
      super(props);
      this.state = {
         appStyle: {
            height: window.innerHeight,
            overflow: 'auto'
         }
      }
   }

   render() {
      console.log();
      return (
         <div className="map-content">
            <div className="app-content" style={this.state.appStyle}>

            </div>
            <Map />
         </div>
      );
   }
}

export default AboutUs;