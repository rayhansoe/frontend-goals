import { useEffect, useState } from 'react'

import { FaUser } from 'react-icons/fa'

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	})

	const { name, email, password, password2 } = formData

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
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
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
						<input
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
