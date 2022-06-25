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

export const addTodo = createAsyncThunk('store/todos/addTodo', async (val, { rejectWithValue, dispatch }) => {
	try {
		const response = await axiosInstance.post(`/todos`, val)

		const data = response.data;

		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
})

export const updateTodo = createAsyncThunk('store/todos/updateTodo', async ({ todoId, currentStatusId, nextStatusId }, { rejectWithValue, dispatch }) => {
	try {
		const response = await axiosInstance.put(`/todos/${todoId}/status`, { statusId: nextStatusId })

		const data = response.data;

		return {
			currentStatusId,
			nextStatusId,
			data,
		};

	} catch (error) {
		return rejectWithValue(error);
	}
})

// Slice
const slice = createSlice({
	name: 'todos',
	initialState: {
		1: [],
		2: [],
		3: [],
		4: [],
		5: [],
		6: []
	},
	extraReducers: {
		[getTodos.fulfilled]: (state, action) => action.payload,

		[updateTodo.fulfilled]: (state, action) => {
			const { currentStatusId, nextStatusId, data } = action.payload;

			const prevDestinationStatusData = state[nextStatusId] || []

			return {
				...state,
				[currentStatusId]: state[currentStatusId].filter(item => item.id !== data.id),
				[nextStatusId]: [...prevDestinationStatusData, data]
			}
		}
	}
});

export default slice.reducer