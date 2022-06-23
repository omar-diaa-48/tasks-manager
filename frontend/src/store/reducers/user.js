import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/api';

// Slice
const slice = createSlice({
	name: 'user',
	initialState: {
		data: null,
		profile: {}
	},
	reducers: {
		signinSuccess: (state, action) => {
			setSession(action.payload.accessToken)
			return {
				...state,
				data: action.payload
			}
		},
		signupSuccess: (state, action) => {
			setSession(action.payload.accessToken)
			return {
				...state,
				data: action.payload
			}
		},
		signoutSuccess: (state, action) => {
			setSession(null)
			return {
				...state,
				data: null
			}
		},
	}
});
export default slice.reducer


const { signinSuccess, signupSuccess, signoutSuccess } = slice.actions

export const signin = createAsyncThunk('store/users/signin', async ({ username, password }, { rejectWithValue, dispatch }) => {
	try {
		const response = await axiosInstance.post("/users/signin", {
			username,
			password
		})

		const data = response.data;

		dispatch(signinSuccess(data));

		return Promise.resolve();
	} catch (error) {
		return rejectWithValue(error);
	}
})

export const signinJWT = () => async dispatch => {
	try {
		const token = localStorage.getItem('token');
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		const response = await axiosInstance.post('/users/refresh-token')

		const data = response.data;

		if (data) {
			dispatch(signinSuccess(data))
			return Promise.resolve()
		} else {
			dispatch(signoutSuccess())
			return Promise.reject();
		}

	} catch (error) {
		return console.error(error.message);
	}
};

export const signup = createAsyncThunk('store/users/signup', async ({ username, password }, { rejectWithValue, dispatch }) => {
	try {
		const response = await axiosInstance.post("/users/signup", {
			username,
			password
		})

		const data = response.data;

		dispatch(signupSuccess(data))

		return Promise.resolve();
	} catch (error) {
		return rejectWithValue(error);
	}
})

export const signout = () => async dispatch => {
	dispatch(signoutSuccess())

	return Promise.resolve();
}

const setSession = (token) => {
	if (token) {
		localStorage.setItem('token', token);
		axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
	} else {
		localStorage.removeItem('token');
		delete axiosInstance.defaults.headers.common.Authorization;
	}
}