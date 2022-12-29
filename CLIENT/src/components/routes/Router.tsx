import React, { FC, Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Loading from '../elements/loading/Loading'

const Authorization = lazy(() => import('../authorization/Authorization'))
const HomePage = lazy(() => import('../homePage/HomePage'))
const UsersPage = lazy(() => import('../userspage/UsersPage'))
const Profile = lazy(() => import('../profile/Profile'))
const Photos = lazy(() => import('../photos/Photos'))
const Rooms = lazy(() => import('../rooms/Rooms'))
const Room = lazy(() => import('../rooms/Room'))
const Messenger = lazy(() => import('../messenger/Messenger'))

const Router: FC<{ isAuth: boolean }> = ({ isAuth }) => {
	return <div>
		{isAuth
			? <Routes>
				<Route path='/:id' element={<Suspense fallback={<Loading />}><HomePage /></Suspense>} />
				<Route path='/' element={<Suspense fallback={<Loading />}><Navigate to='/:id' replace /></Suspense>} />
				<Route path='/users' element={<Suspense fallback={<Loading />}><UsersPage /></Suspense>} />
				<Route path='/profile/:id' element={<Suspense fallback={<Loading />}><Profile /></Suspense>} />
				<Route path='/photos' element={<Suspense fallback={<Loading />}><Photos /></Suspense>} />
				<Route path='/rooms' element={<Suspense fallback={<Loading />}><Rooms /></Suspense>} />
				<Route path='/rooms/:id' element={<Suspense fallback={<Loading />}><Room /></Suspense>} />
				<Route path='/messenger' element={<Suspense fallback={<Loading />}><Messenger /></Suspense>} />
				<Route path='*' element={<h2>Page not found</h2>} />
			</Routes>
			: <Routes>
				<Route path='/' element={<Suspense fallback={<Loading />}><Authorization /></Suspense>} />
				<Route path='/login' element={<Suspense fallback={<Loading />}><Navigate to='/' replace /></Suspense>} />
			</Routes>
		}
	</div>
}

export default React.memo(Router)