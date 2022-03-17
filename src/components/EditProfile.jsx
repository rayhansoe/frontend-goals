import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const EditProfile = ({ userProfile }) => {
	const [formData, setFormData] = useState({
		username: '',
		name: '',
		email: '',
	})

	const { name, email, password, password2, username } = formData

	const dispatch = useDispatch()

	// form control
	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	// submit form.
	const onSubmit = e => {
		e.preventDefault()

		if (password !== password2) {
			toast.error('password do not match!')
		} else {
			const userData = {
				username,
				name,
				email,
			}

			dispatch()
		}
	}

	return (
		<>
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
							placeholder={userProfile.username}
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
							placeholder={userProfile.name}
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
							placeholder={userProfile.email}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block' type='submit' disabled>
							Edit Profile
						</button>
					</div>
				</form>
			</section>
		</>
	)
}
export default EditProfile
