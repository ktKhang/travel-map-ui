import { MethodUtil } from '../../utils/MethodUtil';

const initialState = {
   clickRegion: false,
   regionData: null,
   selectedRegion: null,
   reloadMap: false
}
export const regionReducer = (state = initialState, action) => {
   switch (action.type) {
      case "RELOAD_MAP":
         return { ...state, reloadMap: !state.reloadMap }
      case "CLICK_REGION":
         return { ...state, clickRegion: !state.clickRegion }
      case "FETCH_REGION_DATA":
         return { ...state, regionData: MethodUtil.deepClone(action.regionData) }
      case "FETCH_SELECTED_REGION":
         return { ...state, selectedRegion: action.selectedRegion }
      default:
         return state
   }
}
