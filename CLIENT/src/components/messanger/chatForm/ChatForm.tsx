import { ChangeEvent, FC, useState } from 'react'
import s from './ChatForm.module.css'

// import Input from '../../elements/input/Input'
import Button from '../../styleedComponents/Button'
import { messageApi } from '../../../store/query/messagesApi'

type ChatFormProps = {
	userId: string
	chatId: string
}

const ChatForm: FC<ChatFormProps> = ({ chatId, userId }) => {
	const [createMessage] = messageApi.useAddMessageMutation()
	const [input, setInput] = useState('')

	const sendMessage = async () => {
		if (input) {
			const newMessage = {
				conversationId: chatId,
				sender: userId,
				text: input
			}

			await createMessage(newMessage)
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