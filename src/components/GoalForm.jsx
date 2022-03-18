import { useState } from 'react'
import { useDispatch } from 'react-redux'
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
		}
	}

	return (
		<>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<label htmlFor='text'>Goal</label>
						<input type='text' name='text' id='text' value={text} onChange={onChange} required />
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
