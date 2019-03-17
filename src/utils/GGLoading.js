import React, { Component } from 'react';
import loading from '../assets/icons/icon-loading.gif'

class GGLoading extends Component {
   render() {
      return (
         <div className="loading-container">
            <div className="img-loading-content">
               <img src={loading} alt="loading..." className="img-loading" />
            </div>
         </div>
      );
   }
}

export default GGLoading;