import { Types } from "../../actions/types/Place";
import { constant } from "../../utils/Constant";

const initialState = {
   selectedPlace: null
}
export const placeReducer = (state = initialState, action) => {
   switch (action.type) {
      case constant.SET_SELECTED_PLACE:
         return { ...state, selectedPlace: action.selectedPlace }
      default:
         return state
   }
}

const initialStatePlace = {
   payload: {},
   coordinate: {}
};

export const addPlaceReducer = (state = initialStatePlace, action) => {
   switch (action.type) {
      case Types.ADD_PLACE:
         return {
            ...state,
            payload: action.payload
         }
      case Types.FETCH_COORDINATE:
         return {
            ...state,
            coordinate: action.coordinate
         }
      default:
         return state
   }
}