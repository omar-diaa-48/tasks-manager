import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/api';

export const getProfile = createAsyncThunk("store/user/getProfile", async () => {
	const response = await axiosInstance.get("/user/profile")

	const data = response.data;

	return data;
})

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
	},
	extraReducers: {
		[getProfile.fulfilled]: (state, action) => ({
			...state,
			profile: action.payload
		})
	}
});
export default slice.reducer


const { signinSuccess, signupSuccess, signoutSuccess } = slice.actions

export const signin = ({ username, password }) => async dispatch => {
	try {
		const response = await axiosInstance.post("/auth/signin", {
			username,
			password
		})

		const data = response.data;

		dispatch(signinSuccess(data));

		return Promise.resolve();
	} catch (error) {
		return console.error(error.message);
	}
}

export const signinJWT = () => async dispatch => {
	try {
		const token = localStorage.getItem('token');
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		const response = await axiosInstance.post('/auth/refresh-token')

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

export const signup = ({ username, password }) => async dispatch => {
	try {
		const response = await axiosInstance.post("/auth/signup", {
			username,
			password
		})

		const data = response.data;

		dispatch(signupSuccess(data))

		return Promise.resolve();
	} catch (error) {
		return console.error(error.message);
	}
}

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