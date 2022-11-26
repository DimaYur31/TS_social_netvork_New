import { FC, useRef, useEffect } from 'react';
import s from './ChatBox.module.css'
import { messageApi } from '../../../store/query/messagesApi'

import Message from '../message/Message'

const ChatBox: FC<{ conversationId: string }> = ({ conversationId }) => {
	const scrollRef = useRef<HTMLDivElement>(null)
	const { data: messages } = messageApi.useGetMessagesQuery(conversationId)

	useEffect(() => {
		// if (scrollRef !== null) {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
		// }
	}, [messages])

	return (
		<div className={s.chat}>{
			messages && messages.map(message => {
				return <div ref={scrollRef}>
					<Message key={message._id} message={message} />
				</div>
			})
		}</div>
	)
}

export default ChatBox