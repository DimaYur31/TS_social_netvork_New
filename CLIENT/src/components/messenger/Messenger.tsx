import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks'
import { getChatsThunk } from '../../store/slices/apiActions/chatActions'
import { selectDefaultUserId } from '../../selectors/selectors'
import s from './Messenger.module.scss'

import Conversations from './conversations/Conversations'
import { Outlet } from 'react-router-dom'

const Messanger = () => {
	const dispatch = useAppDispatch()
	const _id = useAppSelector(selectDefaultUserId)

	useEffect(() => {
		dispatch(getChatsThunk(_id))
	}, [])
	console.log('Messanger render')
	return (
		<div className={s.messenger}>

			<Conversations />
			<Outlet />
		</div>
	)
}

export default React.memo(Messanger)