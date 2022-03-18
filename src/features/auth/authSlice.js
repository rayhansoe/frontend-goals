import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get User from LocalStorage
const token = JSON.parse(localStorage.getItem('token'))
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
	token: token ? token : null,
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

// Register User
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
	try {
		return await authService.register(user)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Login User
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Logout User
export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout()
})

// Auth Slice
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: state => {
			state.isError = false
			state.isLoading = false
			state.isSuccess = false
			state.message = ''
		},
		hardReset: state => initialState,
	},
	extraReducers: builder => {
		builder
			//
			// Register extras
			// Register extras || Pending
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			// Register extras || Success
			.addCase(register.fulfilled, (state, action) => {
				const { token, userProfile } = action.payload
				state.isLoading = false
				state.isSuccess = true
				state.token = token
				state.user = userProfile
			})
			// Register extras || Rejected
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
				state.token = null
			})
			//
			// Login extras
			// Login extras || Pending
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			// Login extras || Success
			.addCase(login.fulfilled, (state, action) => {
				const { token, userProfile } = action.payload
				state.isLoading = false
				state.isSuccess = true
				state.token = token
				state.user = userProfile
			})
			// Login extras || Rejected
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
				state.token = null
			})
			//
			// Logout
			// Logout extra
			.addCase(logout.fulfilled, state => {
				state.token = null
				state.user = null
			})
	},
})

export const { reset, hardReset } = authSlice.actions
export default authSlice.reducer
