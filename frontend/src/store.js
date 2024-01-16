// store.js
import { createStore } from 'redux';
import rootReducer from './Reducers/Index'; // Create a rootReducer

const store = createStore(rootReducer); // Pass the rootReducer to createStore

export default store;

