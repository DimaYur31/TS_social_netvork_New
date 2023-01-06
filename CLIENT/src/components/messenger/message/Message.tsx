import React, { FC, useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { useAppSelector } from '../../../hooks/reactReduxHooks'
import { MessageType } from '../../../types/conwersations'
import { UserType } from '../../../types/profile'
import { getUserData } from '../../../api/userApi'
import { getPhoto } from '../../../hooks/hooks'
import { selectDefaultUser } from '../../../selectors/selectors'
import s from './Message.module.scss'

import ContextMenu from '../../elements/contextMenu/ContextMenu'

type MessagePropsType = {
	message: MessageType
}

const Message: FC<MessagePropsType> = ({ message }) => {
	const defaultUser = useAppSelector(selectDefaultUser)
	const isOwner = message.sender === defaultUser._id
	const classOvner = isOwner ? `${s.owner}` : null
	const [participant, setParticipant] = useState<UserType | null>(null)

	useEffect(() => {
		!isOwner && getParticipant(message.sender)
	}, [message._id])

	const getParticipant = async (id: string) => {
		!isOwner && await getUserData(id)
			.then(data => setParticipant(data))
	}

	return (
		<div className={`${s.message} ${classOvner}`}>
			<div>
				<img src={!participant ? getPhoto(defaultUser.avatar) : getPhoto(participant.avatar)} />
				<span>{format(message.createdAt)}</span>
			</div>
			<p>{message.text}
				{isOwner &&
					<ContextMenu
						id={message._id}
						text={message.text}
					/>
				}
			</p>
		</div>
	)
}

export default React.memo(Message)