import React, { Component } from 'react';

class GGSearch extends Component {
   render() {
      return (
         <div className="search-div">
            <input className="search" type="text" name="search" placeholder="Where is your last adventure?"></input>
            <div className="search-result">

            </div>
         </div>
      );
   }
}

export default GGSearch;