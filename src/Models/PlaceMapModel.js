import CommonModel from "./CommonModel";
import { constant } from "../utils/Constant";
import PlaceUserDetailModel from "./PlaceUserDetailModel";

class PlaceMapModel extends CommonModel {
   constructor(jsonData) {
      super(jsonData);

      this.name = jsonData.name;
      this.title = jsonData.title;
      this.svgPath = jsonData.svgPath;
      this.latitude = jsonData.latitude;
      this.longitude = jsonData.longitude;
      this.placeStatus = jsonData.placeStatus;
      this.scale = null;
      this.color = constant.PLACE_NORMAL_COLOR;
      this.marked = false;
      this.placeUsers = this.buildPlaceUsers(jsonData.placeUsers);
      this.placeUserDetail = this.buildPlaceUserDetail(jsonData.placeUserDetail);
   }

   buildPlaceUsers = (jsonData) => {
      let placeUsers = [];
      // need to build list placeUsers later
      return placeUsers;
   }

   buildPlaceUserDetail = (jsonData) => {
      if (jsonData === null || jsonData === void 0) {
         this.scale = 0.5;
         return null;
      } else {
         this.scale = 0.5;
         this.color = constant.PLACE_MARKED_COLOR;
         this.marked = true;
         let placeUserDetail = new PlaceUserDetailModel(jsonData);
         return placeUserDetail;
      }
   }

}

export default PlaceMapModel;