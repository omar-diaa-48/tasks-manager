import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import user from "./reducers/user";

const reducer = combineReducers({
	user
})

const store = configureStore({
	reducer,
	devTools: true // alow chrome developer tools
})

export default store;