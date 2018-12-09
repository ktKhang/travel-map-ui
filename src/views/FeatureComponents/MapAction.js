import React, { Component } from 'react';
import { constant } from '../../utils/Constant';
import { connect } from 'react-redux';
class MapAction extends Component {
   constructor(props) {
      super(props);
      this.state = {
         hover: {
            divHover: false,

         }

      }
   }

   onHover = () => {
      let hover = this.state.hover
      hover.divHover = true
      this.setState({
         hover: hover
      })
   }
   onMouseLeave = () => {
      let hover = this.state.hover
      hover.divHover = false
      this.setState({
         hover: hover
      })
   }

   render() {
      let actionBtnGroup = (
         <div className="map-action-content">
            <div className="map-action-container">
               <button className="map-action-item" disabled>Add Post</button>
               <button className="map-action-item" disabled>Add Album</button>
               <button className="map-action-item-end" disabled>Mark Place</button>
            </div>
         </div>
      )
      if (localStorage[constant.TOKEN_VARIABLE_NAME]) {
         if (this.props.regionReducer.clickRegion && this.props.placeReducer.selectedPlace === null) {
            actionBtnGroup = (
               <div onMouseEnter={this.onHover} onMouseLeave={this.onMouseLeave} className={this.state.hover.divHover ? 'map-action-content-hover' : 'map-action-content'}>
                  <div className="map-action-container">
                     <button className={this.state.hover.divHover ? 'map-action-item-hover' : 'map-action-item'}>Write a Post</button>
                     <button className={this.state.hover.divHover ? 'map-action-item-hover' : 'map-action-item'}>Add Album</button>
                     <button className="map-action-item-end" disabled>Mark Place</button>
                  </div>
               </div>
            )
         } else if (this.props.placeReducer.selectedPlace !== null) {
            actionBtnGroup = (
               <div onMouseEnter={this.onHover} onMouseLeave={this.onMouseLeave} className={this.state.hover.divHover ? 'map-action-content-hover' : 'map-action-content'}>
                  <div className="map-action-container">
                     <button className={this.state.hover.divHover ? 'map-action-item-hover' : 'map-action-item'}>Write a Post</button>
                     <button className={this.state.hover.divHover ? 'map-action-item-hover' : 'map-action-item'}>Add Album</button>
                     <button className={this.state.hover.divHover ? 'map-action-item-end-hover' : 'map-action-item-end'}>Mark Place</button>
                  </div>
               </div>
            )
         }

      }
      return (
         <div className="map-action">

            {actionBtnGroup}
         </div>
      );
   }
}
const mapStateToProps = (state, ownProps) => {
   return {
      regionReducer: state.regionReducer,
      placeReducer: state.placeReducer
   }
}

export default connect(mapStateToProps)(MapAction);