import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import axiosInstance from '../../utilities/api';

export const getUsers = createAsyncThunk('store/users/getUsers', async (val, { rejectWithValue, dispatch }) => {
	try {
		const response = await axiosInstance.get("/users")

		const data = response.data;

		return data;
	} catch (error) {
		toast.error(error.response?.data?.message)
		rejectWithValue(error)
	}
})

// Slice
const slice = createSlice({
	name: 'users',
	initialState: [],
	extraReducers: {
		[getUsers.fulfilled]: (state, action) => action.payload
	}
});

export default slice.reducer