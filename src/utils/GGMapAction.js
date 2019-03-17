import React, { Component } from 'react';
import { constant } from './Constant';
import { connect } from 'react-redux';
import { ggCommon } from './GGCommon';
class GGMapAction extends Component {
   constructor(props) {
      super(props);
      this.state = {
         hover: {
            divHover: false,
         }
      }
   }

   onHover = () => {
      if (localStorage[constant.TOKEN_VARIABLE_NAME]
         && (this.props.selectedRegion !== null || this.props.selectedPlace !== null)) {
         let hover = this.state.hover;
         hover.divHover = true;
         this.setState({
            hover: hover
         })
      }
   }
   onMouseLeave = () => {
      if (localStorage[constant.TOKEN_VARIABLE_NAME]
         && (this.props.selectedRegion !== null || this.props.selectedPlace !== null)) {
         let hover = this.state.hover;
         hover.divHover = false;
         this.setState({
            hover: hover,
         })
      }
   }

   addPost = () => {
      if (this.props.selectedRegion !== null || this.props.selectedPlace !== null) {
         ggCommon.setAddPost();
      }
   }

   addAlbum = () => {
      if (this.props.selectedRegion !== null || this.props.selectedPlace !== null) {
         ggCommon.setAddAlbum();
      }
   }

   checkIsDisabled = (action) => {
      let disabled = true;
      if (localStorage[constant.TOKEN_VARIABLE_NAME]) {
         disabled = false;
      }
      return disabled;
   }

   getClassNameForItem = (action) => {
      let className = 'map-action-item';
      if (action === 'addVideo') {
         className = 'map-action-item-end';
      }
      if (localStorage[constant.TOKEN_VARIABLE_NAME]) {
         if (this.state.hover.divHover) {
            className = 'map-action-item-hover';
            if (action === 'addVideo') {
               className = 'map-action-item-end-hover';
            }
         }
      }
      return className;
   }

   componentWillUnmount() {
      ggCommon.cancelAddPost();
      ggCommon.cancelAddAlbum();
   }

   render() {
      return (
         <div className="map-action">
            <div className={this.state.hover.divHover ? 'map-action-content-hover' : 'map-action-content'}
               onMouseEnter={this.onHover} onMouseLeave={this.onMouseLeave}>
               <div className="map-action-container">
                  <button className={this.getClassNameForItem()} disabled={this.checkIsDisabled()}
                     onClick={() => this.addPost()}>Add Post</button>
                  <button className={this.getClassNameForItem()} disabled={this.checkIsDisabled()}
                     onClick={() => this.addAlbum()}>Add Album</button>
                  <button className={this.getClassNameForItem('addVideo')} disabled={this.checkIsDisabled()}>Add Video</button>
               </div>
            </div>
         </div>
      );
   }
}
const mapStateToProps = (state, ownProps) => {
   return {
      selectedRegion: state.regionReducer.selectedRegion,
      selectedPlace: state.placeReducer.selectedPlace,
   }
}

export default connect(mapStateToProps)(GGMapAction);