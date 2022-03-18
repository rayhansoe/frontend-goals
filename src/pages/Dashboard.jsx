// import all things
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getGoals, reset } from '../features/goals/goalSlice'
import Spinner from '../components/Spinner'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'

const Dashboard = () => {
	// global state
	const { user } = useSelector(state => state.auth)
	const { goals, isError, isLoading, message, isDeleted, isSuccess, isCreated } = useSelector(
		state => state.goals
	)

	// tools
	const navigate = useNavigate()
	const dispatch = useDispatch()

	// useEffect
	useEffect(() => {
		// Jika gagal fetching data
		if (isError) {
			toast.error(message)
		}

		// Jika tidak ada user / tidak login
		if (!user) {
			navigate('/login')
		}

		if (isDeleted) {
			toast.warn(message)
		}

		if (isCreated) {
			toast.success(message)
		}

		if (user) {
			// fetch all Goals
			dispatch(getGoals())
		}

		return () => {
			// reset data goals global state
			dispatch(reset())
		}
	}, [user, navigate, dispatch, isError, message, isDeleted, isCreated])

	// If the fetching is pending
	if (isLoading) {
		return <Spinner />
	}

	const GoalList = goals.map(goal => <GoalItem key={goal._id} goal={goal} />)

	const Goal = () => (
		<section className='content'>
			{goals.length ? (
				<div className='goals'>{GoalList}</div>
			) : (
				<h3>You have not set any goals.</h3>
			)}
		</section>
	)

	if (user && isSuccess) {
		return (
			<>
				<p>Dashboard</p>
				<section className='heading'>
					<h1>
						Welcome <Link to={`/${user && user.username}`}>{user && user.name}</Link>
					</h1>
					<p>Goals Dashboard</p>
				</section>

				<GoalForm />

				<Goal />
			</>
		)
	}

	return <></>
}
export default Dashboard
