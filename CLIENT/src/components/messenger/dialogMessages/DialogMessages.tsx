import { FC, useRef, useEffect } from 'react'
import s from './DialogMessages.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { getMessagesThunk } from '../../../store/slices/apiActions/chatActions'
import { socket } from '../../../socket'

import Message from '../message/Message'
import { getMessage, removeMessage } from '../../../store/slices/chatSlice'

const DialogMessages: FC<{ conversationId: string }> = ({ conversationId }) => {
	const dispatch = useAppDispatch()
	const scrollRef = useRef<HTMLDivElement>(null)
	const { messages } = useAppSelector(store => store.messenger)

	useEffect(() => {
		dispatch(getMessagesThunk(conversationId))

		// scrollRef.current?.scrollIntoView({ behavior: 'smooth' })

		socket.on('getMessage', message => {
			dispatch(getMessage(message))
		})

		socket.on('removedMessage', (messageId: string) => {
			dispatch(removeMessage(messageId))
		})
	}, [messages])

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

export default DialogMessages