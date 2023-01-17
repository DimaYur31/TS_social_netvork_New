import React, { FC, useEffect, useState } from 'react'

import { UserType } from '../../../types/profile'
import { ConversationType } from '../../../types/conwersations'
import { getUserData } from '../../../api/userApi'
import { socket } from '../../../socket'
import { useAppDispatch } from '../../../hooks/reactReduxHooks'
import UserItem from '../../elements/user-item/UserItem'
import { removeChat, setCurrentChat } from '../../../store/slices/chatSlice'

import s from './ChatRoom.module.scss'

type RoomProps = {
	userId: string
	room: ConversationType
}

const ChatRoom: FC<RoomProps> = ({ room, userId }) => {
	const dispatch = useAppDispatch()
	const [member, setMember] = useState<UserType | null>(null)
	const user = room.members.find(id => id !== userId)

	const fetchData = async () => {
		await getUserData(user!)
			.then(data => setMember(data))
	}

	useEffect(() => {
		fetchData()
	}, [user])

	socket.on('deleteConversation', (conversationId: string) => {
		dispatch(removeChat(conversationId))
	})

	const deleteChat = () => {
		socket.emit('deleteConversation', room._id)
		dispatch(setCurrentChat(''))
	}

	return (
		member && <div className={s.chat} >
			<UserItem user={member} />
			<span onClick={() => deleteChat()}>x</span>
		</div>
	)
}

export default React.memo(ChatRoom)