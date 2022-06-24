import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/api';

export const getTodos = createAsyncThunk('store/todos/getTodos', async (val, { rejectWithValue, dispatch }) => {
	try {
		const response = await axiosInstance.get("/todos")

		const data = response.data;

		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
})

// Slice
const slice = createSlice({
	name: 'todo',
	initialState: {
		data: []
	},
	extraReducers: {
		[getTodos.fulfilled]: (state, action) => {
			return {
				data: action.payload
			};
		}
	}
});

export default slice.reducer