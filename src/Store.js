const redux = require('redux')

const regionInitialState = {
   clickRegion: false
}
const regionReducer = (state = regionInitialState, action) => {
   switch (action.type) {
      case "CLICK_REGION":
         return { ...state, clickRegion: !state.clickRegion }
      default:
         return state
   }
}

const placeInitialState = {
   clickPlace: false
}
const placeReducer = (state = placeInitialState, action) => {
   switch (action.type) {
      case "CLICK_PLACE":
         return { ...state, clickPlace: !state.clickPlace }
      default:
         return state
   }
}

const appReducer = redux.combineReducers({
   regionReducer: regionReducer,
   placeReducer: placeReducer
})

const store = redux.createStore(appReducer)
store.dispatch({ type: "CLICK_REGION" })

export default store;