import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateGoal } from '../features/goals/goalSlice'
import Spinner from './Spinner'

const EditGoal = ({ goal }) => {
	const [formData, setFormData] = useState({
		text: '',
	})

	const { text } = formData

	const { isGoalUpdated, isError, isLoading, message } = useSelector(state => state.goals)

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

		if (text) {
			const goalData = { text, id: goal._id }

			dispatch(updateGoal(goalData))
		}
	}

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (isGoalUpdated) {
			toast.success(message)
		}
	}, [isError, isGoalUpdated, message])

	if (isLoading) {
		return <Spinner />
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
							id='text'
							name='text'
							value={text}
							placeholder={goal.text}
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block' type='submit'>
							Edit Goal
						</button>
					</div>
				</form>
			</section>
		</>
	)
}
export default EditGoal
