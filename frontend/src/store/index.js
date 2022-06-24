import { configureStore, isAsyncThunkAction, isRejected } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { combineReducers } from 'redux';
import status from "./reducers/status";
import todo from "./reducers/todo";
import user from "./reducers/user";

const reducer = combineReducers({
	user,
	status,
	todo
})

const errorHandler = (api) => (next) => (action) => {
	if (isAsyncThunkAction(action)) {

		console.log({action});

		//exclude get requests errors from being notified in the UI 
		if (!action?.type?.includes('get')) {

			if (isRejected(action)) {
				let message = 'Failed to do the current operation'

				if (action?.payload?.message) {
					message = action?.payload?.message;
				}

				toast(message)
			}

		}

	}
	return next(action)
}

const middlewares = [errorHandler];

const store = configureStore({
	reducer,
	devTools: true, // alow chrome developer tools
	middlewares
})

export default store;