import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { chechAuthUser } from './store/slices/apiActions/userActions'
import { useAppSelector, useAppDispatch } from './hooks/reactReduxHooks'
import { socket } from './socket/index'
import { selectProfileState } from './selectors/selectors'

import Header from './components/header/Header'
import Navbar from './components/navbar/Navbar'
import ContentWrapper from './components/styleedComponents/ContentWrapper'
import Router from './components/routes/Router'

const App = () => {
	console.log('App render')
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { isAuth, defaultUser } = useAppSelector(selectProfileState)

	useEffect(() => {
		if (defaultUser._id && isAuth) {

			socket.emit('addUser', defaultUser._id)
			socket.on('getUsers', users => {
				console.log('users online')
			})
		}
		// return socket.off('getUsers')
	}, [defaultUser._id])

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			navigate('/login')
		} else {
			dispatch(chechAuthUser())
		}
	}, [isAuth])

	return <>
		{isAuth && <Header />}

		<ContentWrapper isAuth={isAuth}>
			{isAuth && <Navbar />}
			<Router isAuth={isAuth} />
		</ContentWrapper>
	</ >
}

export default App