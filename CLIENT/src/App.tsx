import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { chechAuthUser } from './store/slices/apiActions/userActions'
import { useAppSelector, useAppDispatch } from './hooks/reactReduxHooks'
import { selectIsAuth } from './selectors/selectors'

import { Router } from './components/routes/Router'
import { useTheme } from './hooks/useTheme'

export const App = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const isAuth = useAppSelector(selectIsAuth)
	useTheme()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			navigate('/login')
		} else {
			dispatch(chechAuthUser())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth])

	return <Router isAuth={isAuth} />
}