import { FC } from 'react'
import s from './ChatBox.module.css'
import { messageApi } from '../../../store/query/messagesApi'

import Message from '../message/Message'

const ChatBox: FC<{ conversationId: string }> = ({ conversationId }) => {
	const { data: messages } = messageApi.useGetMessagesQuery(conversationId)

	return (
		<div className={s.chat} >{
			messages && messages.map(message => {
				return <Message key={message._id} message={message} />
			})
		}</div>
	)
}

export default ChatBox