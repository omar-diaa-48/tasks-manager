import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import axiosInstance from '../../utilities/api';

export const getTasks = createAsyncThunk('store/tasks/getTasks', async (val, { rejectWithValue, dispatch }) => {
	try {
		const response = await axiosInstance.get("/tasks")

		const data = response.data;

		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
})

export const addTask = createAsyncThunk('store/tasks/addTask', async (val, { rejectWithValue, dispatch }) => {
	try {
		const response = await axiosInstance.post(`/tasks`, val)

		const data = response.data;

		return data;
	} catch (error) {
		toast.error(error.response?.data?.message)
		rejectWithValue(error);
	}
})

export const updateTaskStatus = createAsyncThunk('store/tasks/updateTaskStatus', async ({ taskId, currentStatusId, nextStatusId }, { rejectWithValue, dispatch }) => {
	try {
		const response = await axiosInstance.put(`/tasks/${taskId}/status`, { statusId: nextStatusId })

		const data = response.data;

		return {
			currentStatusId,
			nextStatusId,
			data,
		};

	} catch (error) {
		toast.error(error.response?.data?.message)
		rejectWithValue(error);
	}
})

// Slice
const slice = createSlice({
	name: 'tasks',
	initialState: {
		1: [],
		2: [],
		3: [],
		4: [],
		5: [],
		6: []
	},
	extraReducers: {
		[getTasks.fulfilled]: (state, action) => action.payload,

		[updateTaskStatus.fulfilled]: (state, action) => {
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