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