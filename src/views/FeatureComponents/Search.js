import React, { Component } from 'react';

class Search extends Component {
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

export default Search;