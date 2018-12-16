import React, { Component } from 'react';
import { connect } from 'react-redux';
import { constant } from '../../utils/Constant';
import ActionForm from '../FeatureComponents/ActionForm';

class Explore extends Component {
   constructor(props) {
      super(props);
      this.state = {
         appStyle: {
            width: '340px',
            height: window.innerHeight,
            overflow: 'auto'
         },
         regionData: null,
         selectedRegion: null,
         selectedRegionData: null
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
               let selectedPlace = this.props.placeReducer.selectedPlace
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
               content = (
                  <div style={{ color: 'white' }}>
                     this's a content of selected place
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
            <div className="app-content" style={this.state.appStyle}>
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