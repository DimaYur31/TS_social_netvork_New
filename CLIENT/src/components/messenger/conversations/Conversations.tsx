import React from 'react'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { selectChats, selectDefaultUserId } from '../../../selectors/selectors'
import { setCurrentChat } from '../../../store/slices/chatSlice'

import ChatRoom from '../chatRoom/ChatRoom'

import s from './Conversations.module.scss'


const Conversations = () => {
	const dispatch = useAppDispatch()
	const _id = useAppSelector(selectDefaultUserId)
	const chats = useAppSelector(selectChats)

	const handelCurrentChat = (chatid: string) => {
		dispatch(setCurrentChat(chatid))
	}

	return <>
		<div className={s.conversations}>
			{chats.length
				? chats.map(chat => {
					return <NavLink
						className={({ isActive }) => isActive ? s.active : null}
						to={`/messenger/${chat._id}`}
						key={chat._id}
						onClick={() => handelCurrentChat(chat._id)}
					>
						<ChatRoom
							userId={_id}
							room={chat}
						/>
					</NavLink>
				})
				: <p>Conversations list is empty</p>
			}
		</div>
	</>
}

export default React.memo(Conversations)