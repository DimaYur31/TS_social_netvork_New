import { FC, useEffect, useState } from 'react'
import { format } from 'timeago.js'
import s from './Message.module.scss'
import { useAppSelector } from '../../../hooks/reactReduxHooks'
import { MessageType } from '../../../types/conwersations'
import { UserType } from '../../../types/profile'
import { getUserData } from '../../../api/userApi'
import { getPhoto } from '../../../hooks/hooks'
import { SVG } from '../../../img/icons/exportIcons'
import { socket } from '../../../socket'

type MessagePropsType = {
	message: MessageType
}

const Message: FC<MessagePropsType> = ({ message }) => {
	const { defaultUser } = useAppSelector(store => store.profilePage)
	const isOwner = message.sender === defaultUser._id
	const classOvner = isOwner ? `${s.owner}` : null
	const [participant, setParticipant] = useState<UserType | null>(null)

	const getParticipant = async (id: string) => {
		!isOwner && await getUserData(id)
			.then(data => setParticipant(data))
	}

	const deleteMessage = (messageId: string) => {
		socket.emit('deleteMessage', messageId)
	}


	useEffect(() => {
		!isOwner && getParticipant(message.sender)
	}, [message._id])

	return (
		<div className={`${s.message} ${classOvner}`}>
			<div>
				<img src={!participant ? getPhoto(defaultUser.avatar) : getPhoto(participant.avatar)} />
				<span>{format(message.createdAt)}</span>
			</div>
			<p>{message.text}</p>
			<span
				className={`${classOvner}`}
				onClick={() => deleteMessage(message._id)}
			><SVG.Dustbin /></span>
			<span
				className={`${classOvner}`}
			// onClick={() => editMessage(message._id)}
			><SVG.Edit /></span>
		</div>
	)
}

export default Message