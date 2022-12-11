import { lazy, useEffect, Suspense } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { chechAuthUser } from './store/slices/apiActions/userActions'
import { useAppSelector, useAppDispatch } from './hooks/reactReduxHooks'
import { socket } from './socket/index'

import Navbar from './components/navbar/Navbar'
import Header from './components/header/Header'
import Loading from './components/elements/loading/Loading'
import HomePage from './components/homePage/HomePage'
import ContentWrapper from './components/styleedComponents/ContentWrapper'
// import Authorization from './components/authorization/Authorization'
// import AuthorizationTest from './components/authorization/AuthorizationTest'
const UsersPage = lazy(() => import('./components/userspage/UsersPage'))
const Authorization = lazy(() => import('./components/authorization/Authorization'))
const Profile = lazy(() => import('./components/profile/Profile'))
const Photos = lazy(() => import('./components/photos/Photos'))
const Rooms = lazy(() => import('./components/rooms/Rooms'))
const Room = lazy(() => import('./components/rooms/Room'))
const Messenger = lazy(() => import('./components/messenger/Messenger'))



const App = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { isAuth, defaultUser } = useAppSelector(state => state.profilePage)

	useEffect(() => {
		if (defaultUser._id) {

			socket.emit('addUser', defaultUser._id)
			socket.on('getUsers', users => {
				console.log('users online')
			})
		}

		// return socket.off('getUsers')
	}, [])

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			navigate('/login')
		} else {
			dispatch(chechAuthUser()).then(
				() => navigate(`/${defaultUser._id}`)
			)
		}
	}, [isAuth])


	return <>
		{isAuth && <Header />}

		<ContentWrapper isAuth={isAuth}>
			{isAuth && <Navbar />}

			<div>
				{isAuth
					? <Routes>
						<Route path='/:id' element={<HomePage />} />
						<Route path='/profile/:id' element={<Suspense fallback={<Loading />}><Profile /></Suspense>} />
						<Route path='/users' element={<Suspense fallback={<Loading />}><UsersPage /></Suspense>} />
						<Route path='/photos' element={<Suspense fallback={<Loading />}><Photos /></Suspense>} />
						<Route path='/rooms' element={<Suspense fallback={<Loading />}><Rooms /></Suspense>} />
						<Route path='/rooms/:id' element={<Suspense fallback={<Loading />}><Room /></Suspense>} />
						<Route path='/messanger' element={<Suspense fallback={<Loading />}><Messenger /></Suspense>} />
						{/* <Route path='*' element={<h2>Page not found</h2>} /> */}
					</Routes>
					: <Routes>
						<Route path='/' element={<Suspense fallback={<Loading />}><Authorization /></Suspense>} />
						<Route path='/login' element={<Suspense fallback={<Loading />}><Authorization /></Suspense>} />
					</Routes>
				}
			</div>
		</ContentWrapper>
	</ >
}

export default App