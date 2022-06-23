import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const messageSlice = createSlice({
	name: 'message',
	initialState: null,
	reducers: {
		showMessage: (state, action) => {
			toast.error(action.payload, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
		}
	}
});

export const { showMessage } = messageSlice.actions;

export default messageSlice.reducer;
