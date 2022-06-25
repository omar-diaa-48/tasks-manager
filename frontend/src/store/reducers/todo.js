import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/api';

export const getTodoById = createAsyncThunk('store/todos/getTodoById', async (todoId, { rejectWithValue, dispatch }) => {
	try {
		const response = await axiosInstance.get(`/todos/${todoId}`)

		const data = response.data;

		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
})

// Slice
const slice = createSlice({
	name: 'todos',
	initialState: null,
	reducers: {
		resetTodo: (state, action) => null
	},
	extraReducers: {
		[getTodoById.fulfilled]: (state, action) => action.payload
	}
});

export default slice.reducer

export const { resetTodo } = slice.actions;