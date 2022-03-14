import { useEffect, useState } from 'react'

import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const { email, password } = formData

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}
	const onSubmit = e => {
		e.preventDefault()
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
