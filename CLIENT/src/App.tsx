import React, { useEffect, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/navbar/Navbar'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Loading from './components/elements/loading/Loading'
import Authorization from './components/authorization/Authorization'
const Profile = React.lazy(() => import('./components/profile/Profile'))
const Photos = React.lazy(() => import('./components/photos/Photos'))

// import DialogsContainer from './components/dialogs/DialogsContainer'
// import FriendsContainer from './components/friends/FriendsContainer'
// import UsersContainer from './components/users/UsersContainer'


import { chechAuthUser } from './store/slices/apiActions/userActions'
import { useAppSelector, useAppDispatch } from './hooks/reactReduxHooks'

const App: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isAuth } = useAppSelector(state => state.profilePage)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			dispatch(chechAuthUser())
		}
	}, [isAuth])

	return (
		<div className='App'>
			<Header />
			<Navbar />
			<div className='contentWrapper' >
				{isAuth
					?
					<Routes>
						<Route path='/profile/*' element={<Suspense fallback={<Loading />}><Profile /></Suspense>} />
						<Route path='/photos' element={<Suspense fallback={<Loading />}><Photos /></Suspense>} />
						{/* <Route path='/dialogs/*' element={<DialogsContainer />} /> */}
						{/* <Route path='/friends/*' element={<FriendsContainer />} /> */}
						{/* <Route path='/users/*' element={<UsersContainer />} /> */}
					</Routes>
					:
					<Routes>
						<Route path='/login' element={<Authorization />} />
					</Routes>
				}

			</div>
			<Footer />
		</div >
	)
}

export default App