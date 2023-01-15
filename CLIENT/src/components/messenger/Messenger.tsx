import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks'
import { getChatsThunk } from '../../store/slices/apiActions/chatActions'
import { selectDefaultUserId } from '../../selectors/selectors'

import s from './Messenger.module.scss'

import Conversations from './conversations/Conversations'

const Messenger = () => {
	const dispatch = useAppDispatch()
	const _id = useAppSelector(selectDefaultUserId)

	useEffect(() => {
		dispatch(getChatsThunk(_id))
	}, [])

	return (
		<div className={s.messenger}>
			<Conversations />
			<Outlet />
		</div>
	)
}

export default React.memo(Messenger)