import { regionReducer, placeReducer } from './Reducer'

const redux = require('redux')

const appReducer = redux.combineReducers({
   regionReducer: regionReducer,
   placeReducer: placeReducer
})

const store = redux.createStore(appReducer)

export default store;