/**
 * Common model: Most models should extend this class.
 */
class CommonModel {
   constructor(jsonData) {
      this.id = jsonData !== void 0 ? jsonData.id : "";
      this.uid = jsonData !== void 0 ? jsonData.uid : "";
      this.createdDate = jsonData !== void 0 ? jsonData.createdDate : "";
      this.createdBy = jsonData !== void 0 ? jsonData.createdBy : "";
      this.updatedDate = jsonData !== void 0 ? jsonData.updatedDate : "";
      this.updatedBy = jsonData !== void 0 ? jsonData.updatedBy : "";
   }
}
export default CommonModel;