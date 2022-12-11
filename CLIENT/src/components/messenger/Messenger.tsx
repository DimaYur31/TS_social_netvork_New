import { useEffect, useState } from 'react'
import s from './Messenger.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks'

import { getChatsThunk } from '../../store/slices/apiActions/chatActions'
import Conversations from './conversations/Conversations'
import DialogItem from './dialogItem/DialogItem'

const Messanger = () => {
	const dispatch = useAppDispatch()
	const { _id } = useAppSelector(store => store.profilePage.defaultUser)


	useEffect(() => {
		dispatch(getChatsThunk(_id))
	}, [])

	return (
		<div className={s.messenger}>
			<Conversations />
			<DialogItem />
		</div>
	)
}

export default Messanger