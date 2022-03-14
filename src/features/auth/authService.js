import axios from 'axios'

// const BASE_URL = 'http://localhost:5000'
const USER_API = '/api/users/'

// Register user
const register = async userData => {
	const response = await axios.post(USER_API, userData)

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data
}

// Login user
const login = async userData => {
	const response = await axios.post(USER_API + 'login', userData)

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data
}

// Logout user
const logout = () => {
	localStorage.removeItem('user')
}

const authService = {
	register,
	logout,
	login,
}

export default authService
