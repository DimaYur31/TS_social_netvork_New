import React, { FC, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { getMessagesThunk } from '../../../store/slices/apiActions/chatActions'
import { socket } from '../../../socket'
import { editMessage, getMessage, removeMessage } from '../../../store/slices/chatSlice'
import { selectMessages } from '../../../selectors/selectors'

import Message from '../message/Message'

import s from './DialogMessages.module.scss'


const DialogMessages: FC<{ conversationId: string }> = ({ conversationId }) => {
	const dispatch = useAppDispatch()
	const messages = useAppSelector(selectMessages)
	// const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		dispatch(getMessagesThunk(conversationId))
		// scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])


	socket.on('getMessage', message => {
		dispatch(getMessage(message))
	})

	socket.on('removedMessage', (messageId: string) => {
		dispatch(removeMessage(messageId))
	})

	socket.on('updateMessage', (message: any) => {
		dispatch(editMessage(message))
	})


	// Данный компонент постоянно рендерится, пока не заню что с этим делать
	// console.log('DialogMessages render')
	return (
		<div className={s.chat}>{
			messages?.map(message => {
				return <div key={message._id}
				// ref={scrollRef}
				>
					<Message message={message} />
				</div>
			})
		}</div>
	)
}

export default React.memo(DialogMessages)