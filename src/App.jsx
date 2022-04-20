import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Goal from './pages/Goal'
import NotFound from './pages/NotFound'
import axios from 'axios'

function App() {
	useEffect(() => {
		axios.get('https://backendgoalsapi.herokuapp.com/')
	}, [])

	return (
		<>
			<Router>
				<div className='container'>
					<Header />
					<Routes>
						<Route path='*' element={<NotFound />} />
						<Route path='/' element={<Dashboard />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/:username' element={<Profile />} />
						<Route path='/goals/:goalId' element={<Goal />} />
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	)
}

export default App
