import CommonModel from "./CommonModel";

class RegionUserDetailModel extends CommonModel {
   constructor(jsonData) {
      super(jsonData);
      this.feelings = jsonData.feelings;
      this.albums = jsonData.albums;
      this.videos = jsonData.videos;
   }
}
export default RegionUserDetailModel;