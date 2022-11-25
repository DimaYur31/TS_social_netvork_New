import { useState } from 'react'
import s from './Messanger.module.css'
import { useAppSelector } from '../../hooks/reactReduxHooks'
import { messageApi } from '../../store/query/messagesApi'

import Input from '../elements/input/Input'
import Button from '../styleedComponents/Button'
import ChatBox from './chatBox/ChatBox'
import MessageRoom from './messageRoom/MessageRoom'

const Messanger = () => {
	const [currentChat, setCurrentChat] = useState<string | null>(null)
	const { _id } = useAppSelector(store => store.profilePage.defaultUser)
	const { data: messageRooms } = messageApi.useGetConversationsQuery(_id)

	return (
		<div className={s.messanger}>
			< >
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

						<div className={s.panel} >
							<Input />
							<Button onClick={() => null}>Send</Button>
						</div>
					</div>
					: <p>Open a conversation to start a chat.</p>
			}

		</div>
	)
}

export default Messanger