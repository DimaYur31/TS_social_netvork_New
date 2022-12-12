import { ChangeEvent, FC, useState } from 'react'
import s from './ChatForm.module.scss'

import Button from '../../styleedComponents/Button'
import { socket } from '../../../socket'

type ChatFormProps = {
	userId: string
	chatId: string
}

const ChatForm: FC<ChatFormProps> = ({ chatId, userId }) => {
	const [text, setText] = useState('')

	const sendMessage = async () => {
		if (!text.trim()) return

		socket.emit('sendMessage', {
			conversationId: chatId,
			sender: userId,
			text: text
		})

		setText('')
	}

	return (
		<div className={s.panel} >
			<input
				value={text}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
			/>
			<Button onClick={() => sendMessage()}>Send</Button>
		</div>
	)
}

export default ChatForm