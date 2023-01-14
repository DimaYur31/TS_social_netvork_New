import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { chechAuthUser } from './store/slices/apiActions/userActions'
import { useAppSelector, useAppDispatch } from './hooks/reactReduxHooks'
import { selectIsAuth } from './selectors/selectors'

import Router from './components/routes/Router'

const App = () => {
	console.log('App render')
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const isAuth = useAppSelector(selectIsAuth)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			navigate('/login')
		} else {
			dispatch(chechAuthUser())
		}
	}, [isAuth])

	return <Router isAuth={isAuth} />
}

export default App