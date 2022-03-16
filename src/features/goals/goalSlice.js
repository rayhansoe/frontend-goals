import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import goalService from './goalService'

// initial state
const initialState = {
	goals: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

// Create Goal
export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.token
		return await goalService.createGoal(goalData, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Get All Goals
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.token
		return await goalService.getGoals(token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Goal Slice
export const goalSlice = createSlice({
	name: 'goal',
	initialState,
	reducers: {
		reset: state => initialState,
	},
	extraReducers: builder => {
		builder
			// Create Goal extras || Pending
			.addCase(createGoal.pending, state => {
				state.isLoading = true
			})
			// Create Goal extras || Success
			.addCase(createGoal.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.goals.push(action.payload)
			})
			// Create Goal extras || Rejected
			.addCase(createGoal.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
