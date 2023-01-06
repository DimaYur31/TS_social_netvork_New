import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { selectChats, selectDefaultUserId } from '../../../selectors/selectors'
import { setCurrentChat } from '../../../store/slices/chatSlice'

import ChatRoom from '../chatRoom/ChatRoom'
import { useNavigate } from 'react-router-dom'


const Conversations = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const _id = useAppSelector(selectDefaultUserId)
	const chats = useAppSelector(selectChats)

	const handelCurrentChat = (chatid: string) => {
		dispatch(setCurrentChat(chatid))

		navigate(`/messenger/${chatid}`)

	}
	console.log('Conversations render')
	return <>
		{chats.length
			? chats.map(chat => {
				return <div
					key={chat._id}
					onClick={() => handelCurrentChat(chat._id)}
				>
					<ChatRoom
						userId={_id}
						room={chat}
					/>
				</div>
			})
			: <p>Conversations list is empty</p>
		}
	</>
}

export default React.memo(Conversations)