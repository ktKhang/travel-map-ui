import React, { Component } from 'react';
import { connect } from 'react-redux';
import { constant } from '../../utils/Constant';
import GGActionForm from '../../utils/GGActionForm';
import { userService, showModal } from "../../services";
import { ggCommon } from '../../utils/GGCommon';

class Explore extends Component {
   constructor(props) {
      super(props);
      this.state = {
         feelingPlaces: null,
      }
   }

   componentWillUnmount() {
      ggCommon.cancelAddPost();
      ggCommon.cancelAddAlbum();
   }

   renderPlacesListData = (placeList) => {
      return placeList.map((place, index) => {
         return (
            <div className="explore-container-places">
               <i className={place.placeUserDetail === null ? 'fa icon-check-custom icon-check-point' : 'fa icon-check-custom icon-check-point-active'}></i>
               <div>
                  <p className="explore-place-label">{place.title}</p>
                  <label className="explore-place-label-mini">24 người đã check-in tại đây</label>
               </div>
            </div>
         )
      })
   }

   /**
    * Render header for region/place content
    */
   renderRegionHeader = (selectedRegion) => {
      return (
         <div className="explore-region-label">
            <label>{selectedRegion.title.split(",")[0].toUpperCase()}</label>
         </div>
      )
   }

   renderPlaceHeader = (selectedRegion, selectedPlace) => {
      return (
         <div>
            <div className="explore-region-label">
               <label>{selectedRegion.title.split(",")[0].toUpperCase()}</label>
            </div>
            <div className="explore-container-places" style={{ marginBottom: '28px' }}>
               <i className="fa icon-check-custom icon-check-point-active"></i>
               <div>
                  <p className="explore-place-label">{selectedPlace.title}</p>
                  <label className="explore-place-label-mini">24 người đã check-in tại đây</label>
               </div>
            </div>
         </div>
      )
   }

   /**
    * Render content of Explore page when user logged in
    */
   renderContentWithUserLoggedIn = (selectedRegion, selectedPlace, mapAction) => {
      let content = null;
      // in case a region is selected
      if (selectedRegion !== null && selectedPlace === null) {
         // if click add post
         if (mapAction.addPost) {
            content = (
               <div>
                  {this.renderRegionHeader(selectedRegion)}
                  <GGActionForm type="region" />
               </div>
            )
         } else {
            content = (
               <div>
                  {this.renderRegionHeader(selectedRegion)}
                  <div className="explore-content">
                     {
                        this.renderPlacesListData(selectedRegion.images)
                     }
                  </div>
               </div>
            )
         }
      }
      // in case a place is selected
      else if (selectedRegion !== null && selectedPlace !== null) {
         // if click add post
         if (mapAction.addPost) {
            content = (
               <div>
                  {this.renderPlaceHeader(selectedRegion, selectedPlace)}
                  <GGActionForm type="place" />
               </div>
            )
         } else {
            content = (
               <div>
                  {this.renderPlaceHeader(selectedRegion, selectedPlace)}
               </div>
            )
         }
      }
      return content;
   }

   /**
    * Render content of Explore page
    */
   renderDefaultContent = (selectedRegion, selectedPlace) => {
      let content = null;
      // in case Click to select region
      if (selectedRegion !== null && selectedPlace === null) {
         content = (
            <div>
               {this.renderRegionHeader(selectedRegion)}
               <div className="explore-content">
                  {
                     this.renderPlacesListData(selectedRegion.images)
                  }
               </div>
            </div>
         )
      }
      // in case Click to select place
      else if (selectedRegion !== null && selectedPlace !== null) {
         content = (
            <div>
               {this.renderPlaceHeader(selectedRegion, selectedPlace)}
            </div>
         )
      }
      return content;
   }

   render() {
      const { selectedRegion } = this.props.regionReducer;
      const { selectedPlace } = this.props.placeReducer;
      const mapAction = this.props.actionReducer;
      let content = null;

      if (localStorage[constant.TOKEN_VARIABLE_NAME]) {  // if user logged in
         content = this.renderContentWithUserLoggedIn(selectedRegion, selectedPlace, mapAction);

      } else {
         content = this.renderDefaultContent(selectedRegion, selectedPlace);
      }
      return (
         <div className="map-content" style={{ width: 'fit-content' }}>
            <div className="user-app-content-explore">
               {content}
            </div>

         </div>
      )
   }
}
const mapStateToProps = (state, ownProps) => {
   return {
      regionReducer: state.regionReducer,
      placeReducer: state.placeReducer,
      actionReducer: state.actionReducer
   }
}

export default connect(mapStateToProps)(Explore);