import { FaWindowClose } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteGoal } from '../features/goals/goalSlice'

const GoalItem = ({ goal }) => {
	const dispatch = useDispatch()

	const onClick = () => {
		if (dispatch(deleteGoal(goal._id))) {
			toast.warn('Goal is Deleted!')
		}
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
