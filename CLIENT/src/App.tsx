import React, { lazy, useEffect, Suspense } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { chechAuthUser } from './store/slices/apiActions/userActions'
import { useAppSelector, useAppDispatch } from './hooks/reactReduxHooks'

import Navbar from './components/navbar/Navbar'
import Header from './components/header/Header'
import Loading from './components/elements/loading/Loading'
import Authorization from './components/authorization/Authorization'
import HomePage from './components/homePage/HomePage'
import ContentWrapper from './components/styleedComponents/ContentWrapper'
const Profile = lazy(() => import('./components/profile/Profile'))
const Photos = lazy(() => import('./components/photos/Photos'))
const Rooms = lazy(() => import('./components/rooms/Rooms'))
const Room = lazy(() => import('./components/rooms/Room'))

const App: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isAuth } = useAppSelector(state => state.profilePage)
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			dispatch(chechAuthUser())
			navigate('/')
		} else {
			navigate('/login')
		}
	}, [isAuth])

	return (
		<>
			{isAuth && <Header />}
			<ContentWrapper isAuth={isAuth}>
				{isAuth && <Navbar />}

				<div>
					{isAuth
						? <Routes>
							<Route path='/' element={<HomePage />} />
							<Route path='/profile/*' element={<Suspense fallback={<Loading />}><Profile /></Suspense>} />
							<Route path='/photos' element={<Suspense fallback={<Loading />}><Photos /></Suspense>} />
							<Route path='/rooms' element={<Suspense fallback={<Loading />}><Rooms /></Suspense>} />
							<Route path='/rooms/:id' element={<Suspense fallback={<Loading />}><Room /></Suspense>} />

						</Routes>
						: <Routes>
							<Route path='/login' element={<Authorization />} />
						</Routes>
					}
				</div>
			</ContentWrapper>
		</ >
	)
}

export default App