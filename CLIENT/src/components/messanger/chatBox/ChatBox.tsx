import { FC, useRef, useEffect } from 'react';
import s from './ChatBox.module.css'
import { messageApi } from '../../../../мусор/query/messagesApi'
import { socket } from '../../../socket'
import Message from '../message/Message'
import { MessageType } from '../../../types/conwersations';

const ChatBox: FC<{ conversationId: string }> = ({ conversationId }) => {
	const scrollRef = useRef<HTMLDivElement>(null)
	const { data: messages, } = messageApi.useGetMessagesQuery(conversationId)
	const [getMessage] = messageApi.useAddMessageMutation()

	const addNewMessage = async (message: MessageType) => {
		await getMessage(message)
	}

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })

		socket.on('getMessage', message => {
			addNewMessage(message)
		})
	}, [])

	return (
		<div className={s.chat}>{
			messages && messages.map(message => {
				return <div ref={scrollRef} key={message._id}>
					<Message message={message} />
				</div>
			})
		}</div>
	)
}

export default ChatBox