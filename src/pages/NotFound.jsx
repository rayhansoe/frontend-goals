import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<>
			<h1>Sorry, this page isn't available.</h1>
			<p>
				The link you followed may be broken, or the page may have been removed.{' '}
				<Link to={'/'}>Go back to Home.</Link>
			</p>
		</>
	)
}
export default NotFound
