import { regionReducer, placeReducer, addPlaceReducer, actionReducer } from './Reducer'

const redux = require('redux')

const appReducer = redux.combineReducers({
   regionReducer: regionReducer,
   placeReducer: placeReducer,
   addPlaceReducer: addPlaceReducer,
   actionReducer: actionReducer,
})

const store = redux.createStore(appReducer);

store.subscribe(() => {
   console.log(store.getState());
})

const getState = () => {
   return store.getState();
}

export default store;
export const storeFunc = {
   getState
};