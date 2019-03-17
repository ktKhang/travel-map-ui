import CommonModel from "./CommonModel";
import PlaceMapModel from "./PlaceMapModel";
import { constant } from "../utils/Constant";
import RegionUserDetailModel from "./RegionUserDetailModel";

class RegionMapModel extends CommonModel {
   constructor(jsonData) {
      super(jsonData);

      this.name = jsonData.name;
      this.title = jsonData.title;
      this.markedPlaces = 0;
      this.passZoomValuesToTarget = true;
      this.color = constant.REGION_NORMAL_COLOR;
      this.regionUserDetail = this.buildRegionUserDetail(jsonData.regionUserDetail);
      this.images = this.buildPlaceList(jsonData.placeList, jsonData.regionUserDetail);   // placeList
   }

   buildRegionUserDetail = (jsonData) => {
      let regionUserDetail = null;
      if (jsonData !== null && jsonData !== void 0) {
         regionUserDetail = new RegionUserDetailModel(jsonData);
      }
      return regionUserDetail;
   }

   buildPlaceList = (placeList, regionUserDetail) => {
      let places = [];
      let markedPlaces = 0;
      placeList.forEach(item => {
         let place = new PlaceMapModel(item);
         if (place.marked) {
            markedPlaces++;
         }
         places.push(place);
      });
      this.markedPlaces = markedPlaces;

      // get region color
      if (markedPlaces !== 0) {
         this.color = this.specifyColorForRegion(placeList.length, markedPlaces);

      } else if (regionUserDetail !== null && regionUserDetail !== void 0) {
         if (regionUserDetail.feelings.length !== 0 || regionUserDetail.albums.length !== 0) {
            // set marked 30%
            this.color = constant.REGION_MARKED_30_COLOR
         }
      }

      return places;
   }

   specifyColorForRegion = (allPlaces, markedPlace) => {
      let percent = (markedPlace * 100) / allPlaces
      let color = constant.REGION_NORMAL_COLOR
      if (percent > 0 && percent <= 30) {
         color = constant.REGION_MARKED_30_COLOR
      } else if (percent > 30 && percent <= 80) {
         color = constant.REGION_MARKED_80_COLOR
      } else if (percent > 80 && percent <= 100) {
         color = constant.REGION_MARKED_100_COLOR
      }
      return color
   }
}
export default RegionMapModel;