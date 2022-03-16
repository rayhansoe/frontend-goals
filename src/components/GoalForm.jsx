import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createGoal } from '../features/goals/goalSlice'

const GoalForm = () => {
	const [text, setText] = useState('')

	const dispatch = useDispatch()

	const onChange = e => {
		setText(e.target.value)
	}

	const onSubmit = e => {
		e.preventDefault()

		if (dispatch(createGoal({ text }))) {
			setText('')
			toast.success('New Goal Created!')
		}
	}

	return (
		<>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<label htmlFor='text'>Goal</label>
						<input type='text' name='text' id='text' value={text} onChange={onChange} />
					</div>
					<div className='form-group'>
						<button className='btn btn-block' type='submit'>
							Add Goal
						</button>
					</div>
				</form>
			</section>
		</>
	)
}
export default GoalForm