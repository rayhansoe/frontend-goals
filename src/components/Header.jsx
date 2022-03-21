import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { hardReset, logout } from '../features/auth/authSlice'
import { reset } from '../features/goals/goalSlice'

const Header = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { user } = useSelector(state => state.auth)

	const onLogout = () => {
		dispatch(logout())
		dispatch(hardReset())
		dispatch(reset())
		navigate('/')
	}

	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>GoalSetter</Link>
			</div>
			<ul>
				{user ? (
					<>
						<li>
							<button className='btn' onClick={onLogout}>
								<FaSignOutAlt /> Logout
							</button>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to='/login'>
								<FaSignInAlt /> Login
							</Link>
						</li>
						<li>
							<Link to='/register'>
								<FaUser /> Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	)
}
export default Header
