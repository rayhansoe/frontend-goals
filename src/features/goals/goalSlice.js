import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import goalService from './goalService'

// initial state
const initialState = {
	goals: [],
	goal: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	isUpdated: false,
	isDeleted: false,
	isCreated: false,
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

// Get Goal by ID
export const getGoalById = createAsyncThunk('goals/getGoalById', async (goalId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.token
		return await goalService.getGoalById(goalId, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Update Goal
export const updateGoal = createAsyncThunk('goals/updateGoal', async (goalData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.token
		return await goalService.updateGoal(goalData, token)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Delete Goal
export const deleteGoal = createAsyncThunk('goals/delete', async (goalId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.token
		return await goalService.deleteGoal(goalId, token)
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
	name: 'goals',
	initialState,
	reducers: {
		reset: state => initialState,
	},
	extraReducers: builder => {
		builder
			//
			// CREATE GOAL
			// Create Goal extras || Pending
			.addCase(createGoal.pending, state => {
				state.isLoading = true
			})
			// Create Goal extras || Success
			.addCase(createGoal.fulfilled, (state, action) => {
				const { goal, message } = action.payload
				state.isLoading = false
				state.isSuccess = true
				state.isCreated = true
				state.message = message
				state.goals.push(goal)
			})
			// Create Goal extras || Rejected
			.addCase(createGoal.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			//
			// Get User's Goals
			// Get Goals extras || Pending
			.addCase(getGoals.pending, state => {
				state.isLoading = true
			})
			// Get Goals extras || Success
			.addCase(getGoals.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.goals = action.payload
			})
			// Get Goals extras || Rejected
			.addCase(getGoals.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				console.log(action.payload)
			})
			//
			// Get Goal by ID
			// Get Goal by ID extras || Pending
			.addCase(getGoalById.pending, state => {
				state.isLoading = true
			})
			// Get Goal by ID extras || Success
			.addCase(getGoalById.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.goal = action.payload
			})
			// Get Goal by ID extras || Rejected
			.addCase(getGoalById.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			//
			// Update Goal
			// Update Goal by ID extras || Pending
			.addCase(updateGoal.pending, state => {
				state.isLoading = true
			})
			// Update Goal by ID extras || Success
			.addCase(updateGoal.fulfilled, (state, action) => {
				const { updatedGoal, message } = action.payload
				state.isLoading = false
				state.isUpdated = true
				state.message = message
				state.goals = state.goals.map(goal =>
					goal._id === updatedGoal._id ? { ...updatedGoal } : goal
				)
			})
			// Update Goal by ID extras || Rejected
			.addCase(updateGoal.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			//
			// Delete Goal
			// Delete Goal by ID extras || Pending
			.addCase(deleteGoal.pending, state => {
				state.isLoading = true
			})
			// Delete Goal by ID extras || Success
			.addCase(deleteGoal.fulfilled, (state, action) => {
				const { id, message } = action.payload
				state.isLoading = false
				state.isSuccess = true
				state.isDeleted = true
				state.message = message
				state.goals = state.goals.filter(goal => goal._id !== id)
			})
			// Delete Goal by ID extras || Rejected
			.addCase(deleteGoal.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
