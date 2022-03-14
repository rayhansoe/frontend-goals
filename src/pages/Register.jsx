import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { reset, register } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		name: '',
		email: '',
		password: '',
		password2: '',
	})

	const { name, email, password, password2, username } = formData

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user, isError, isLoading, isSuccess, message } = useSelector(state => state.auth)

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (isSuccess || user) {
			navigate('/')
		}

		dispatch(reset())
	}, [user, isError, isSuccess, message, navigate, dispatch])

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}
	const onSubmit = e => {
		e.preventDefault()

		if (password !== password2) {
			toast.error('password do not match!')
		} else {
			const userData = {
				username,
				name,
				email,
				password,
			}

			dispatch(register(userData))
		}
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							required
							className='form-control'
							type='text'
							id='username'
							name='username'
							value={username}
							placeholder='Enter your Username'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							required
							className='form-control'
							type='text'
							id='name'
							name='name'
							value={name}
							placeholder='Enter your Name'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							required
							className='form-control'
							type='email'
							id='email'
							name='email'
							value={email}
							placeholder='Enter your Email'
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
							placeholder='Enter Password'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							required
							className='form-control'
							type='password'
							id='password2'
							name='password2'
							value={password2}
							placeholder='Confirm Password'
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
export default Register
