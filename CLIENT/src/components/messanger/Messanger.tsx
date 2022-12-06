import { useEffect, useState } from 'react'
import s from './Messanger.module.css'
import { useAppSelector } from '../../hooks/reactReduxHooks'
import { messageApi } from '../../../мусор/query/messagesApi'

import ChatBox from './chatBox/ChatBox'
import MessageRoom from './messageRoom/MessageRoom'
import ChatForm from './chatForm/ChatForm'

const Messanger = () => {
	const [currentChat, setCurrentChat] = useState<string | null>(null)
	const { _id } = useAppSelector(store => store.profilePage.defaultUser)
	const { data: messageRooms } = messageApi.useGetConversationsQuery(_id)


	// useEffect(() => {

	// }, [])

	return (
		<div className={s.messanger}>
			<>
				{messageRooms && messageRooms.map(room => {
					return <div onClick={() => setCurrentChat(room._id)}>
						<MessageRoom
							key={room._id}
							userId={_id}
							room={room}
						/>
					</div>
				})
				}
			</>
			{
				currentChat
					? <div className={s.list}>
						<ChatBox conversationId={currentChat} />

						<ChatForm userId={_id} chatId={currentChat} />
					</div>
					: <p>Open a conversation to start a chat.</p>
			}

		</div>
	)
}

export default Messanger