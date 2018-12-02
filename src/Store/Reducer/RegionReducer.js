const initialState = {
   clickRegion: false
}
export const regionReducer = (state = initialState, action) => {
   switch (action.type) {
      case "CLICK_REGION":
         return { ...state, clickRegion: !state.clickRegion }
      default:
         return state
   }
}
