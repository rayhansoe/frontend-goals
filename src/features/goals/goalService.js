import axios from 'axios'

// const BASE_URL = 'http://localhost:5000'
const GOALS_API = '/api/goals/'

// Create Goal
const createGoal = async (goalData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.post(GOALS_API, goalData, config)

	return response.data
}

const goalService = {
	createGoal,
}

export default goalService
