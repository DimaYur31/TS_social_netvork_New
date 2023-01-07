import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import s from './ChatForm.module.scss'

import Button from '../../styleedComponents/Button'
import { socket } from '../../../socket'
import { EditContext } from '../messengerContext/EditMessageContext'
import PrimaryInpyt from '../../elements/inputs/primaryInput/PrimaryInpyt'
import { Clear } from '../../styleedComponents/Search'

type ChatFormProps = {
	userId: string
	chatId: string
}

const ChatForm: FC<ChatFormProps> = ({ chatId, userId }) => {
	console.log('ChatForm render')
	const { editState, setEditState } = useContext(EditContext)
	const [text, setText] = useState('')

	useEffect(() => {
		return () => setEditState({
			isEdit: false,
			text: '',
			messageId: ''
		})
	}, [])

	const changeText = (e: ChangeEvent<HTMLInputElement>) => {
		if (editState.isEdit) {
			setEditState({
				...editState,
				text: e.target.value
			})
		} else {
			setText(e.target.value)
		}
	}

	const sendMessage = async () => {
		if (editState.isEdit) {
			socket.emit('editMessage', {
				text: editState.text,
				messageId: editState.messageId
			})

			setEditState({
				isEdit: false,
				text: '',
				messageId: ''
			})

			return
		}

		if (!text.trim()) return

		socket.emit('sendMessage', {
			conversationId: chatId,
			sender: userId,
			text: text
		})

		setText('')
	}

	const clear = () => {
		if (!editState.isEdit) {
			setText('')
		}
		setEditState({
			isEdit: false,
			text: '',
			messageId: ''
		})
	}

	return (
		<div className={s.panel} >
			<div>
				<PrimaryInpyt
					value={editState.isEdit ? editState.text : text}
					onChange={(e: ChangeEvent<HTMLInputElement>) => changeText(e)}
				/>
				<Clear onClick={() => clear()} />
			</div>

			<Button onClick={() => sendMessage()}>
				{!editState.isEdit ? 'Send' : 'Edit'}
			</Button>
		</div>
	)
}

export default React.memo(ChatForm)