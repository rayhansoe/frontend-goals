import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
	userProfile: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

// User Profile
export const userProfile = createAsyncThunk('user/userProfile', async (username, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.token
		return await userService.userProfile(username, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		reset: state => initialState,
	},
	extraReducers: builder => {
		builder
			// User Profile extras || Pending
			.addCase(userProfile.pending, state => {
				state.isLoading = true
			})
			// User Profile extras || Success
			.addCase(userProfile.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.userProfile = action.payload
			})
			// User Profile extras || Rejected
			.addCase(userProfile.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.userProfile = null
			})
	},
})

export const { reset } = userSlice.actions
export default userSlice.reducer
