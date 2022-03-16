// import all things
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getGoals, reset } from '../features/goals/goalSlice'
import { reset as resetUser } from '../features/users/userSlice'
import Spinner from '../components/Spinner'
import GoalForm from '../components/GoalForm'

const Dashboard = () => {
	// global state
	const { user } = useSelector(state => state.auth)
	const { goals, isError, isLoading, message } = useSelector(state => state.goals)

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

		if (user) {
			// fetch all Goals
			dispatch(getGoals())
		}

		// reset data user global state
		dispatch(resetUser())
		return () => {
			// reset data goals global state
			dispatch(reset())
		}
	}, [user, navigate, dispatch, isError, message])

	// If the fetching is pending
	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			{user && (
				<>
					<p>Dashboard</p>
					<section className='heading'>
						<h1>
							Welcome <Link to={`/${user && user.username}`}>{user && user.name}</Link>
						</h1>
						<p>Goals Dashboard</p>
					</section>

					<GoalForm />
				</>
			)}
		</>
	)
}
export default Dashboard
