import { memo, useEffect, useState } from 'react'
import { format } from 'timeago.js'

import { useAppSelector } from '../../../hooks/reactReduxHooks'
import { MessageType } from '../../../types/conwersations'
import { UserType } from '../../../types/profile'
import { getUserData } from '../../../api/userApi'
import { useIsOwner, usePhotosPath } from '../../../hooks/hooks'
import { selectDefaultUserAvatar } from '../../../selectors/selectors'

import { ContextMenu } from '../../elements/contextMenu/ContextMenu'

import s from './Message.module.scss'

type MessagePropsType = {
	message: MessageType
}

export const Message = memo(({ message }: MessagePropsType) => {
	const avatar = useAppSelector(selectDefaultUserAvatar)
	const isOwner = useIsOwner(message.sender)
	const classOvner = isOwner ? `${s.owner}` : null
	const [participant, setParticipant] = useState<UserType | null>(null)

	useEffect(() => {
		!isOwner && getParticipant(message.sender)
	}, [message._id])

	const getParticipant = async (id: string) => {
		await getUserData(id)
			.then(data => setParticipant(data))
	}

	return (
		<div className={`${s.message} ${classOvner}`}>
			<div>
				<img
					src={usePhotosPath(!participant ? avatar : participant.avatar)}
					alt='avatar'
				/>
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
})