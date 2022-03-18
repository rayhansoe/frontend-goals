import axios from 'axios'

// const BASE_URL = 'http://localhost:5000'
const USER_API = 'https://backendgoalsapi.herokuapp.com/api/users/'

// Get User Profile || get user by username
const userProfile = async (username, token) => {
	if (token) {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}

		const response = await axios.get(USER_API + username, config)

		return response.data

		// without token / public
	} else {
		const response = await axios.get(USER_API + username)

		return response.data
	}
}

const userService = {
	userProfile,
}

export default userService
