import { configureStore, isAsyncThunkAction, isRejected } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import message, { showMessage } from "./reducers/message";
import status from "./reducers/status";
import user from "./reducers/user";

const reducer = combineReducers({
	user,
	message,
	status
})

const errorHandler = (api) => (next) => (action) => {
	if (isAsyncThunkAction(action)) {
		const { dispatch } = api;

		//exclude get requests errors from being notified in the UI 
		if (!action?.type?.includes('get')) {

			if (isRejected(action)) {
				let message = 'Failed to do the current operation'

				if (action?.payload?.message) {
					message = action?.payload?.message;
				}


				dispatch(showMessage(message))
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