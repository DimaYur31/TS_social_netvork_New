import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { selectChats, selectDefaultUserId } from '../../../selectors/selectors'
import { setCurrentChat } from '../../../store/slices/chatSlice'
import s from './Conversations.module.scss'

import ChatRoom from '../chatRoom/ChatRoom'
// import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'


const Conversations = () => {
	// const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const _id = useAppSelector(selectDefaultUserId)
	const chats = useAppSelector(selectChats)

	const handelCurrentChat = (chatid: string) => {
		dispatch(setCurrentChat(chatid))
		// navigate(`/messenger/${chatid}`)
	}

	console.log('Conversations render')
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