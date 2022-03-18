import axios from 'axios'

// const BASE_URL = 'http://localhost:5000'
const USER_API = 'https://backendgoalsapi.herokuapp.com/api/users/'

// Register user
const register = async userData => {
	const response = await axios.post(USER_API, userData)

	if (response.data) {
		const { token } = response.data
		localStorage.setItem('user', JSON.stringify({ token }))
	}

	return response.data
}

// Login user
const login = async userData => {
	const response = await axios.post(USER_API + 'login', userData)

	if (response.data) {
		const { token, userProfile } = response.data
		localStorage.setItem('token', JSON.stringify(token))
		localStorage.setItem('user', JSON.stringify({ userProfile }))
	}

	return response.data
}

// Logout user
const logout = () => {
	localStorage.removeItem('token')
	localStorage.removeItem('user')
}

const authService = {
	register,
	logout,
	login,
}

export default authService
