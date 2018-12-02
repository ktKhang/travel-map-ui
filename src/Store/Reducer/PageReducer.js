const initialState = {
   isExplore: false
}
export const pageReducer = (state = initialState, action) => {
   switch (action.type) {
      case "GET_EXPLORE_PAGE":
         return { ...state, isExplore: !state.isExplore }
      default:
         return state
   }
}