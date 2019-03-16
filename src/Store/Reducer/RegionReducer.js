import { ggCommon } from '../../utils/GGCommon';

const initialState = {
   clickRegion: false,
   regionData: null,
   selectedRegion: null,
   reloadMap: false
}
export const regionReducer = (state = initialState, action) => {
   switch (action.type) {
      case "RELOAD_MAP":
         return { ...state, reloadMap: action.reload }
      case "CLICK_REGION":
         return { ...state, clickRegion: !state.clickRegion }
      case "FETCH_REGION_DATA":
         return { ...state, regionData: ggCommon.deepClone(action.regionData) }
      case "FETCH_SELECTED_REGION":
         return { ...state, selectedRegion: action.selectedRegion }
      default:
         return state
   }
}
