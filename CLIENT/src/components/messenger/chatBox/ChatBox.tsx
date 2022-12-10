import { FC, useRef, useEffect } from 'react'
import s from './ChatBox.module.scss'
// import { socket } from '../../../socket'
// import { MessageType } from '../../../types/conwersations'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { getMessagesThunk } from '../../../store/slices/apiActions/chatActions'

import Message from '../message/Message'

const ChatBox: FC<{ conversationId: string }> = ({ conversationId }) => {
	const dispatch = useAppDispatch()
	const { messages } = useAppSelector(store => store.messenger)
	const scrollRef = useRef<HTMLDivElement>(null)

	// const addNewMessage = async (message: MessageType) => {
	// await getMessage(message)
	// }

	useEffect(() => {
		dispatch(getMessagesThunk(conversationId))

		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })

		// socket.on('getMessage', message => {
		// addNewMessage(message)
		// })
	}, [])

	return (
		<div className={s.chat}>{
			messages?.map(message => {
				return <div ref={scrollRef} key={message._id}>
					<Message message={message} />
				</div>
			})
		}</div>
	)
}

export default ChatBox