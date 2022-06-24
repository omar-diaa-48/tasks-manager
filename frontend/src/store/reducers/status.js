import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/api';

export const getStatuses = createAsyncThunk('store/statuses/getStatuses', async (val, { rejectWithValue, dispatch }) => {
	try {
		const response = await axiosInstance.get("/statuses")
		
		const data = response.data;

		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
})

// Slice
const slice = createSlice({
	name: 'status',
	initialState: {
		data: []
	},
	extraReducers: {
		[getStatuses.fulfilled]: (state, action) => {
			return {
				data: action.payload
			};
		}
	}
});

export default slice.reducer