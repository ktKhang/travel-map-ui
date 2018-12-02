const initialState = {
   clickPlace: false
}
export const placeReducer = (state = initialState, action) => {
   switch (action.type) {
      case "CLICK_PLACE":
         return { ...state, clickPlace: !state.clickPlace }
      default:
         return state
   }
}