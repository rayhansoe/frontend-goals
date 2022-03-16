import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset, login } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { FaSignInAlt } from 'react-icons/fa'
import { reset as resetUser } from '../features/users/userSlice'

const Login = () => {
	const [formData, setFormData] = useState({
		text: '',
		password: '',
	})

	const { text, password } = formData

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { user, isError, isLoading, isSuccess, message } = useSelector(state => state.auth)

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (isSuccess || user) {
			navigate('/')
		}

		return () => {
			dispatch(reset())
			dispatch(resetUser())
		}
	}, [user, isError, isSuccess, message, navigate, dispatch])

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	const onSubmit = e => {
		e.preventDefault()

		if (!text || !password) {
			toast.error('please add all text fields')
		} else {
			const userData = {
				text,
				password,
			}

			dispatch(login(userData))
		}
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Login and start setting goals</p>
			</section>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							required
							className='form-control'
							type='text'
							id='text'
							name='text'
							value={text}
							placeholder='Enter your Username or Email.'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							required
							className='form-control'
							type='password'
							id='password'
							name='password'
							value={password}
							placeholder='Enter assword'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block' type='submit'>
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	)
}
export default Login
