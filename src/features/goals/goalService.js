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

// Get All Goals
const getGoals = async token => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await axios.get(GOALS_API, config)

	return response.data
}

// Get Goal by ID
const getGoalById = async (goalId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.get(GOALS_API + goalId, config)

	return response.data
}

// Update Goal by ID
const updateGoal = async (goalId, goalData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.put(GOALS_API + goalId, goalData, config)

	return response.data
}

// Delete Goal by ID
const deleteGoal = async (goalId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.delete(GOALS_API + goalId, config)

	return response.data
}

const goalService = {
	createGoal,
	getGoals,
	getGoalById,
	updateGoal,
	deleteGoal,
}

export default goalService
