const EditProfile = ({ userProfile }) => {
	// form control
	const onChange = e => {}

	// submit form.
	const onSubmit = e => {
		e.preventDefault()
	}

	return (
		<>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							disabled
							className='form-control'
							type='text'
							id='username'
							name='username'
							value={userProfile.username}
							placeholder={userProfile.username}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							disabled
							className='form-control'
							type='text'
							id='name'
							name='name'
							value={userProfile.name}
							placeholder={userProfile.name}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							disabled
							className='form-control'
							type='email'
							id='email'
							name='email'
							value={userProfile.email}
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
