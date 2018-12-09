import { regionReducer, placeReducer, pageReducer, addPlaceReducer } from './Reducer'

const redux = require('redux')

const appReducer = redux.combineReducers({
   regionReducer: regionReducer,
   placeReducer: placeReducer,
   pageReducer: pageReducer,
   addPlaceReducer: addPlaceReducer,
})

const store = redux.createStore(appReducer)

export default store;