import { ChangeEvent, FC, useState } from 'react'
import s from './ChatForm.module.scss'

// import Input from '../../elements/input/Input'
import Button from '../../styleedComponents/Button'
// import { messageApi } from '../../../store/query/messagesApi'
import { socket } from '../../../socket'

type ChatFormProps = {
	userId: string
	chatId: string
}

const ChatForm: FC<ChatFormProps> = ({ chatId, userId }) => {
	// const [createMessage] = messageApi.useAddMessageMutation()
	const [input, setInput] = useState('')

	const sendMessage = async () => {
		if (input) {
			// await createMessage(newMessage)

			socket.emit('sendMessage', {
				conversationId: chatId,
				sender: userId,
				text: input
			})
			setInput('')
		}
	}

	return (
		<div className={s.panel} >
			<input
				value={input}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
			/>
			<Button onClick={() => sendMessage()}>Send</Button>
		</div>

	)
}

export default ChatForm