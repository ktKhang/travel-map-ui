import CommonModel from "./CommonModel";

class PlaceUserDetailModel extends CommonModel {
   constructor(jsonData) {
      super(jsonData);
      this.feelings = jsonData.feelings;
      this.albums = jsonData.albums;
      this.videos = jsonData.videos;
   }
}
export default PlaceUserDetailModel;