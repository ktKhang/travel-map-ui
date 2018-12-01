import React, { Component } from 'react';

class MapAction extends Component {
   render() {
      return (
         <div className="map-action">
            <div className="map-action-content">
               <div className="map-action-container">
                  <button className="map-action-item">Add Post</button>
                  <button className="map-action-item">Add Album</button>
                  <button className="map-action-item-end">Mark Place</button>
               </div>
            </div>
         </div>
      );
   }
}

export default MapAction;