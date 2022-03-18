import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { reset, userProfile as getUserProfile } from '../features/users/userSlice'
import EditProfile from '../components/EditProfile'

const Profile = () => {
	const { username } = useParams()

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user } = useSelector(state => state.auth)
	const { userProfile, isError, isLoading, message } = useSelector(state => state.users)

	const UserProfile = () =>
		userProfile ? (
			<p>{`@${userProfile.username}`}</p>
		) : (
			<>
				<h1>Sorry, this page isn't available.</h1>
				<p>
					The link you followed may be broken, or the page may have been removed.{' '}
					<Link to={'/'}>Go back to Home.</Link>
				</p>
			</>
		)

	const EditProfileWrapper = () =>
		user && userProfile && user._id === userProfile.id ? (
			<>
				<EditProfile userProfile={userProfile} />
			</>
		) : (
			<></>
		)

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		dispatch(getUserProfile(username))

		return () => {
			dispatch(reset())
		}
	}, [dispatch, isError, message, navigate, username])

	if (isLoading) {
		return <Spinner />
	}

	if (user && userProfile && user._id === userProfile.id) {
		return (
			<>
				<UserProfile />
				<h1>{userProfile && userProfile.name}</h1>
				<EditProfileWrapper />
			</>
		)
	}

	return <></>
}
export default Profile
