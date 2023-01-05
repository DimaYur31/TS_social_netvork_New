import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { selectChats, selectDefaultUserId } from '../../../selectors/selectors'
import { setCurrentChat } from '../../../store/slices/chatSlice'

import ChatRoom from '../chatRoom/ChatRoom'

const Conversations = () => {
	const dispatch = useAppDispatch()
	const _id = useAppSelector(selectDefaultUserId)
	const chats = useAppSelector(selectChats)
	console.log('Conversations render')
	return <>
		{chats.length
			? chats.map(chat => {
				return <div
					key={chat._id}
					onClick={() => dispatch(setCurrentChat(chat._id))}
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