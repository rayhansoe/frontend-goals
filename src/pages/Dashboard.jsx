import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { reset } from '../features/users/userSlice'

const Dashboard = () => {
	const { user } = useSelector(state => state.auth)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}

		dispatch(reset())
	}, [user, navigate, dispatch])

	return (
		<>
			<p>Dashboard</p>
			<section className='heading'>
				<h1>
					Welcome <Link to={`/${user && user.username}`}>{user && user.name}</Link>
				</h1>
			</section>
		</>
	)
}
export default Dashboard
