import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { socket } from '../../socket'
import { useAppSelector } from '../../hooks/reactReduxHooks'
import { selectProfileState } from '../../selectors/selectors'

import ContentWrapper from '../styleedComponents/ContentWrapper'
import Header from '../header/Header'
import Navbar from '../navbar/Navbar'

const Layout = () => {
	const { isAuth, defaultUser } = useAppSelector(selectProfileState)

	useEffect(() => {
		if (defaultUser._id && isAuth) {

			socket.emit('addUser', defaultUser._id)
			socket.on('getUsers', users => {
				console.log('users online 111111')
			})
		}
		// return socket.off('getUsers')
	}, [defaultUser._id])

	return (<>
		<Header />
		<ContentWrapper isAuth={isAuth}>
			<Navbar />
			<Outlet />
		</ContentWrapper>
	</ >
	)
}

export default Layout