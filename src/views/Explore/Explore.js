import React, { Component } from 'react';
import { Container } from 'react-grid-system';

class Explore extends Component {
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
         </div>
      );
   }
}

export default Explore;