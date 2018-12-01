import React, { Component } from 'react';
import loading from '../../assets/icons/icon-loading.gif'

class Save extends Component {
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
               <div style={{ textAlign: 'center' }}>
                  <img src={loading} alt="loading..." />
               </div>
            </div>
         </div>
      );
   }
}

export default Save;