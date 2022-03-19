import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { getGoalById, reset } from '../features/goals/goalSlice'
import EditGoal from '../components/EditGoal'

const Goal = () => {
	const { goalId } = useParams()

	const dispatch = useDispatch()

	const { user, isLogged } = useSelector(state => state.auth)
	const { goal, isError, isLoading, message } = useSelector(state => state.goals)

	const GoalDetail = () =>
		user && goal && user._id === goal.user ? (
			<>
				<p>{`@${user.username}'s Goal`}</p>
				<h1>{`${goal.text}`}</h1>
			</>
		) : (
			<>
				<h1>Sorry, this page isn't available.</h1>
				<p>
					The link you followed may be broken, or the page may have been removed.{' '}
					<Link to={'/'}>Go back to Home.</Link>
				</p>
			</>
		)

	const EditGoalWrapper = () =>
		user && goal && user._id === goal.user ? (
			<>
				<EditGoal goal={goal} />
			</>
		) : (
			<></>
		)

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (user && isLogged) {
			dispatch(getGoalById(goalId))
		}

		return () => {
			dispatch(reset())
		}
	}, [dispatch, goalId, isError, isLogged, message, user])

	if (isLoading) {
		return <Spinner />
	}

	if (user && goal && user._id === goal.user) {
		return (
			<>
				<GoalDetail />
				<EditGoalWrapper />
			</>
		)
	}

	return <></>
}
export default Goal
