import { ggCommon } from '../../utils/GGCommon';
import { constant } from '../../utils/Constant';

const initialState = {
   regionData: null,
   selectedRegion: null,
   reloadMap: false
}
export const regionReducer = (state = initialState, action) => {
   switch (action.type) {
      case constant.RELOAD_MAP:
         return { ...state, reloadMap: action.reload }
      case constant.SET_REGION_DATA:
         return { ...state, regionData: ggCommon.deepClone(action.regionData) }
      case constant.SET_SELECTED_REGION:
         let newRegionToSet = null;
         if (action.selectedRegion !== null && action.selectedRegion !== void 0) {
            let selectedData = state.regionData.find(region => region.id === action.selectedRegion);
            if (selectedData) {
               newRegionToSet = selectedData;
            }
         }
         return { ...state, selectedRegion: newRegionToSet }
      default:
         return state
   }
}
