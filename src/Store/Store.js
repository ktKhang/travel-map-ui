import { regionReducer, placeReducer, pageReducer } from './Reducer'

const redux = require('redux')

const appReducer = redux.combineReducers({
   regionReducer: regionReducer,
   placeReducer: placeReducer,
   pageReducer: pageReducer
})

const store = redux.createStore(appReducer)

export default store;