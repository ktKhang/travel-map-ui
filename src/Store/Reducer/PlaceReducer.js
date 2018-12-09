import { Types } from "../../actions/types/Place";

const initialState = {
   clickPlace: false,
   selectedPlace: null
}
export const placeReducer = (state = initialState, action) => {
   switch (action.type) {
      case "CLICK_PLACE":
         return { ...state, clickPlace: !state.clickPlace }
      case "FETCH_SELECTED_PLACE":
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
   switch(action.type){
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