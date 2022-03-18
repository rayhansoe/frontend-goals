import { FaWindowClose } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteGoal } from '../features/goals/goalSlice'

const GoalItem = ({ goal }) => {
	const dispatch = useDispatch()

	const onClick = () => {
		dispatch(deleteGoal(goal._id))
	}

	return (
		<div className='goal'>
			<div>{new Date(goal.createdAt).toLocaleString('id-ID')}</div>
			<Link to={`/goals/${goal._id}`}>
				<h2>{goal.text}</h2>
			</Link>
			<button className='close' onClick={onClick}>
				<FaWindowClose />
			</button>
		</div>
	)
}
export default GoalItem
