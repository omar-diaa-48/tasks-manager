import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/api';

export const getTaskById = createAsyncThunk('store/tasks/getTaskById', async (taskId, { rejectWithValue, dispatch }) => {
	try {
		const response = await axiosInstance.get(`/tasks/${taskId}`)

		const data = response.data;

		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
})

// Slice
const slice = createSlice({
	name: 'tasks',
	initialState: null,
	reducers: {
		resetTask: (state, action) => null
	},
	extraReducers: {
		[getTaskById.fulfilled]: (state, action) => action.payload
	}
});

export default slice.reducer

export const { resetTask } = slice.actions;