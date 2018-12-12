import { regionReducer, placeReducer, pageReducer, addPlaceReducer, actionReducer } from './Reducer'

const redux = require('redux')

const appReducer = redux.combineReducers({
   regionReducer: regionReducer,
   placeReducer: placeReducer,
   pageReducer: pageReducer,
   addPlaceReducer: addPlaceReducer,
   actionReducer: actionReducer
})

const store = redux.createStore(appReducer)

export default store;