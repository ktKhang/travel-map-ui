import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { ggCommon } from '../GGCommon';
import { tokenUtil } from '../token';
import { decodeJWT } from '../DecodeJWT';
import { constant } from '../Constant';
import { regionService } from '../../services';
import { toastUtil } from '../ToastUtil';
import RegionMapModel from '../../Models/RegionMapModel';
import GGLoading from '../GGLoading';
import AmCharts from "@amcharts/amcharts3-react";
import GGMapAction from '../GGMapAction';
import { ggMapCommon } from './common';
import PlaceMapModel from '../../Models/PlaceMapModel';

class GGMap extends Component {
   constructor(props) {
      super(props);
      this.state = {
         redirect: false,
         dataProvider: {
            map: "vietnamLow",
            getAreasFromMap: true,
            areas: [],
            zoomLevel: 1.2,
            zoomLongitude: 35,
            zoomLatitude: 25,
         },
         listeners: [{
            event: "clickMapObject",
            method: (e) => this.clickMapObj(e),
         }, {
            event: "writeDevInfo",
            method: function (e) {
               console.log(e);
               alert(e.str);
            }
         }, {
            event: "mouseDownMapObject",
            method: (e) => this.mouseDownMapObj(e)
         },
         {
            event: "click",
            method: function (e) {
               console.log(e);
            }
         },
         {
            event: "homeButtonClicked",
            method: (e) => this.clickHomeBtn(e)
         }, {
            event: "init",
            method: (e) => {
               this.state.chart = e.chart;
               console.log(e.chart);
            }
         }
         ],
         chart: {}
      };
   }

   /**
    * handling with region when click map object
    */
   clickMapObj = (event) => {
      // Ignore any click not on area
      if (event.mapObject.objectType !== "MapArea")
         return;
      let area = event.mapObject;

      area.showAsSelected = !area.showAsSelected;
      // Update the list
      if (area.showAsSelected === true) {
         event.chart.returnInitialColor(area);
         area.showAsSelected = false;

         // set to selectedRegion
         ggMapCommon.setSelectedRegion(area.id);

         if (window.location.hash !== constant.HASH_EXPLORE) {
            setTimeout(() => {
               window.location = '#explore'
            }, 500);
         }
      }
   }

   /**
    * Handling with place when click map object 
    */
   mouseDownMapObj = (event) => {
      if (event.mapObject.objectType === "MapArea") {
         event.chart.dataProvider.areas.forEach(area => {
            area.images.forEach(img => {
               // img.color = constant.PLACE_NORMAL_COLOR
               img.scale = 0.5;
            })
            area.validate();
         })
         ggMapCommon.resetSelectedPlace();

      }
      if (event.mapObject.objectType === "MapImage") {
         let currentRegion = ggMapCommon.getSelectedRegion();
         event.chart.dataProvider.areas.find(area => area.id === currentRegion.id).images.forEach((imgObj) => {
            // imgObj.color = constant.PLACE_NORMAL_COLOR
            imgObj.scale = 0.5;
            imgObj.validate();
         })
         // e.mapObject.color = constant.PLACE_SELECTED_COLOR
         event.mapObject.scale = 1;
         event.mapObject.validate();

         console.log(event.mapObject);
         let currentPlace = new PlaceMapModel(event.mapObject);
         ggMapCommon.setSelectedPlace(currentPlace);
      }
   }

   /**
    * Handle click on home button
    */
   clickHomeBtn = (event) => {
      ggMapCommon.resetSelectedRegion();
      ggMapCommon.resetSelectedPlace();
      ggCommon.cancelAddPost();
      ggCommon.cancelAddAlbum();
   }

   /**
    * initial map data
    */
   initialMapData = () => {
      ggMapCommon.drawMap();
      if (tokenUtil.getSavedToken()) {
         this.loadDataUserLoggedIn();
      } else {
         this.loadData();
      }
   }

   /**
    * load default map data
    */
   loadData = () => {
      regionService.getRegionList().then(data => {
         if (data.errorCode === 0) {
            this.storeFetchedRegionData(data.data);
         }
      })
         .catch(err => {
            toastUtil.showErrorMsg(constant.ERROR_SERVER_BAD_RESPONSE);
         });
   }

   /**
    * load map data with user logged in
    */
   loadDataUserLoggedIn = () => {
      const decodedToken = decodeJWT.decodeToken(localStorage[constant.TOKEN_VARIABLE_NAME]);
      const userUid = decodedToken.sub;
      regionService.loadRegionsWithUserLoggedIn(userUid).then(data => {
         if (data.errorCode === 0) {
            this.storeFetchedRegionData(data.data);
         }
      })
         .catch(err => {
            toastUtil.showErrorMsg(constant.ERROR_SERVER_BAD_RESPONSE);
         });
   }

   /**
    * handle store fetched data from server
    */
   storeFetchedRegionData = (data) => {
      let regionList = data;
      let areas = [];
      regionList.forEach(item => {
         let region = new RegionMapModel(item);
         areas.push(region);
      })
      // set dataProvider for map
      let dataProvider = this.state.dataProvider;
      dataProvider.areas = areas;
      this.setState({
         dataProvider: dataProvider,
      })

      // store region data
      ggCommon.setRegionData(areas);
      ggMapCommon.resetReloadMap();
   }

   componentDidMount() {
      this.initialMapData();
   }

   componentDidUpdate(previousProps, previousState) {
      if (previousProps.reload !== this.props.reload && this.props.reload === true) {
         this.initialMapData();
      }
   }

   componentWillUnmount() {
      ggMapCommon.resetMapData();
   }

   render() {
      const config = {
         "type": "map",
         "theme": "am4themes_animated",
         "fontFamily": "SVN-Poppins",
         "addClassNames": true,
         "dataProvider": this.state.dataProvider,
         "showImagesInList": true,
         "showObjectsAfterZoom": true,
         "imagesSettings": {
            rollOverColor: "#CC0000",
            rollOverScale: 3,
            selectedScale: 3,
            selectedColor: "#CC0000",
            adjustAnimationSpeed: true,
            borderAlpha: 50
         },
         "areasSettings": {
            "autoZoom": true,
            "selectedColor": "#5FA79E",
            "selectable": true,
            "outlineThickness": 0.5,
            "color": constant.REGION_NORMAL_COLOR

            // "rollOverBrightness":10,
            // "selectedBrightness": 20
         },
         // "smallMap": {},
         "developerMode": true,
         "zoomControl": {
            "bottom": 10,
            "left": 10,
            "buttonFillColor": "#bac0c887"
         },
         "listeners": this.state.listeners,
         "mouseWheelZoomEnabled": true
      };
      let mapComponent = (
         <div id="maps" style={this.props.style}>
            <GGLoading />
         </div>
      );
      if (this.state.dataProvider.areas.length !== 0 && !this.props.reload) {
         mapComponent = (
            <div id="maps" style={this.props.style}>
               <AmCharts.React className="mapdiv" style={{ width: "100%", height: "100%", visibility: 'visible' }} options={config} />
               {
                  window.location.hash === constant.HASH_EXPLORE &&
                  <GGMapAction />
               }
            </div>
         );
      }
      return (
         mapComponent
      );

   }
}

export default GGMap;