import React, { Component } from 'react';
import { connect } from 'react-redux';
import { constant } from '../../utils/Constant';
import ActionForm from '../FeatureComponents/ActionForm';
import { userService, showModal } from "../../services";

class Explore extends Component {
   constructor(props) {
      super(props);
      this.state = {
         regionData: null,
         selectedRegion: null,
         selectedRegionData: null,
         feelingPlaces: null
      }
   }
   componentDidMount() {
      let { dispatch } = this.props
      dispatch({ type: 'GET_EXPLORE_PAGE' })
   }
   componentDidUpdate(previousProps, previousState) {
      if (this.state.selectedRegion !== this.props.regionReducer.selectedRegion && this.state.regionData !== null) {
         let regionData = this.props.regionReducer.regionData.find(region => region.id === this.props.regionReducer.selectedRegion)
         if (this.props.regionReducer.selectedRegion === null) {
            regionData = null
         }
         this.setState({
            selectedRegion: this.props.regionReducer.selectedRegion,
            selectedRegionData: regionData
         })
      }
      if (this.state.regionData !== this.props.regionReducer.regionData) {
         this.setState({
            regionData: this.props.regionReducer.regionData
         })
      }
      console.log(this.state.regionData);

   }
   componentWillUnmount() {
      let { dispatch } = this.props
      dispatch({ type: 'GET_EXPLORE_PAGE' })
      if (this.props.regionReducer.clickRegion) {
         dispatch({ type: 'CLICK_REGION' })
      }
      dispatch({
         type: 'ADD_POST',
         value: false
      })
      this.isCancelled = true;
   }

   renderPlacesListData = (places) => {
      console.log(places);
      return places.map((place, index) => {
         if (localStorage[constant.TOKEN_VARIABLE_NAME]) {
            return (
               <div className="explore-container-places">
                  <i className={place.placeUserDetail === null ? 'fa icon-check-custom icon-check-point' : 'fa icon-check-custom icon-check-point-active'}></i>
                  <div>
                     <p className="explore-place-label">{place.title}</p>
                     <label className="explore-place-label-mini">24 người đã check-in tại đây</label>

                  </div>
               </div>
            )
         } else {
            return (
               <div className="explore-container-places" onMouseEnter={(e) => this.onHoverPlace(place)} onMouseLeave={(e) => this.onMouseLeave(place)} >
                  <i className={place.scale === 0.5 ? 'fa icon-check-custom icon-check-point' : 'fa icon-check-custom icon-check-point-active'}></i>
                  <div>
                     <p className="explore-place-label">{place.title}</p>
                     <label className="explore-place-label-mini">24 người đã check-in tại đây</label>

                  </div>
               </div>
            )
         }
      })
   }

   onHoverPlace = (place) => {
      console.log(place);

      let regionData = this.props.regionReducer.regionData
      console.log(regionData);
      console.log(this.state.selectedRegion);
      let index = regionData.findIndex(region => region.id === this.state.selectedRegion)
      console.log(index);

      regionData[index].images.forEach((placeItem, index) => {
         if (place.uid === placeItem.uid) {
            // placeItem.color = constant.PLACE_MARKED_COLOR
            placeItem.scale = 1.5
         } else {
            // placeItem.color = constant.PLACE_NORMAL_COLOR
            placeItem.scale = 0.5
         }
      });
      console.log(regionData);

      const { dispatch } = this.props
      dispatch({
         type: 'FETCH_REGION_DATA',
         regionData: regionData
      })
      dispatch({
         type: 'RELOAD_MAP'
      })
   }

   onMouseLeave = (place) => {
      console.log(place);

      let regionData = this.props.regionReducer.regionData
      console.log(regionData);
      console.log(this.state.selectedRegion);
      let index = regionData.findIndex(region => region.id === this.state.selectedRegion)
      console.log(index);

      regionData[index].images.forEach((placeItem, index) => {
         if (place.uid === placeItem.uid) {
            // placeItem.color = constant.PLACE_NORMAL_COLOR
            placeItem.scale = 0.5
         }
      });
      console.log(regionData);

      const { dispatch } = this.props
      dispatch({
         type: 'FETCH_REGION_DATA',
         regionData: regionData
      })
   }

   getFeelingAtPlace(placeUid) {
      userService.getFeelingAtPlace(placeUid).then(data => {
         if (data.errorMsg) {
            showModal.showErrorMsg(data.errorMsg);
         }
         else {
            data.forEach(element => {
               element.createdDate = new Date(element.createdDate).toLocaleDateString();
            });
            !this.isCancelled && this.setState({
               feelingPlaces: data,
               errorMsg: null,
            });
         }
      })
   }

   renderFeelingAtPlace = (feelings) => {
      if (feelings != null) {
         return feelings.map((feeling, index) => {
            return (
               <div>
                  <p className="explore-region-label">{feeling.topic}</p>
                  <label className="explore-place-label-mini">{feeling.content}</label>
               </div>
            )
         })
      }
      else {
         return (
            <div style={{ color: 'white' }}>

            </div>
         );
      }
   }

   render() {
      let content = <div></div>
      console.log(this.props.placeReducer.selectedPlace);
      if (localStorage[constant.TOKEN_VARIABLE_NAME]) {  // if user logged in
         // in case Click to select region
         if (this.state.selectedRegionData !== null && this.props.placeReducer.selectedPlace === null) {
            if (this.props.actionReducer.addPost) {
               content = (
                  <div>
                     <div className="explore-region-label">
                        <label>{this.state.selectedRegionData.title.split(",")[0].toUpperCase()}</label>
                     </div>
                     <ActionForm type="region" />
                  </div>
               )
            } else {
               content = (
                  <div>
                     <div className="explore-region-label">
                        <label>{this.state.selectedRegionData.title.split(",")[0].toUpperCase()}</label>
                     </div>
                     <div className="explore-content">
                        {
                           this.renderPlacesListData(this.state.selectedRegionData.placeList)
                        }
                     </div>
                  </div>
               )
            }
         }
         // in case Click to select place
         else if (this.state.selectedRegionData !== null && this.props.placeReducer.selectedPlace !== null) {
            if (this.props.actionReducer.addPost) {
               console.log(this.props.placeReducer.selectedPlace);
               let selectedPlace = this.props.placeReducer.selectedPlace;
               content = (
                  <div>
                     <div className="explore-region-label">
                        <label>{this.state.selectedRegionData.title.split(",")[0].toUpperCase()}</label>
                     </div>
                     <div className="explore-container-places" style={{ marginBottom: '28px' }}>
                        <i className="fa icon-check-custom icon-check-point-active"></i>
                        <div>
                           <p className="explore-place-label">{selectedPlace.title}</p>
                           <label className="explore-place-label-mini">24 người đã check-in tại đây</label>
                        </div>
                     </div>
                     <ActionForm type="place" />
                  </div>
               )
            } else {
               let selectedPlace = this.props.placeReducer.selectedPlace;
               content = (
                  <div style={{ color: 'white' }}>
                     <h3 className="explore-region-label"> {selectedPlace.title.split(",")[0].toUpperCase()} </h3>
                     {this.getFeelingAtPlace(selectedPlace.uid)}
                     {this.renderFeelingAtPlace(this.state.feelingPlaces)}
                  </div>
               )
            }
         }

      } else {
         // in case Click to select region
         if (this.state.selectedRegionData !== null && this.props.placeReducer.selectedPlace === null) {
            content = (
               <div>
                  <div className="explore-region-label">
                     <label>{this.state.selectedRegionData.title.split(",")[0].toUpperCase()}</label>
                  </div>
                  <div className="explore-content">
                     {
                        this.renderPlacesListData(this.state.selectedRegionData.placeList)
                     }
                  </div>
               </div>
            )
         }
         // in case Click to select place
         else if (this.state.selectedRegionData !== null && this.props.placeReducer.selectedPlace !== null) {

         }
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
      pageReducer: state.pageReducer,
      actionReducer: state.actionReducer
   }
}

export default connect(mapStateToProps)(Explore);