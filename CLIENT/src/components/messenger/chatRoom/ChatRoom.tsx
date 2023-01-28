import { memo, useEffect, useState } from 'react'

import { UserType } from '../../../types/profile'
import { ConversationType } from '../../../types/conwersations'
import { getUserData } from '../../../api/userApi'
import { socket } from '../../../socket'
import { useAppDispatch } from '../../../hooks/reactReduxHooks'
import { UserItem } from '../../elements/user-item/UserItem'
import { chatActions } from '../../../store/slices/chatSlice'

import s from './ChatRoom.module.scss'

type RoomProps = {
	userId: string
	room: ConversationType
}

export const ChatRoom = memo(({ room, userId }: RoomProps) => {
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
		dispatch(chatActions.removeChat(conversationId))
	})

	const deleteChat = () => {
		socket.emit('deleteConversation', room._id)
		dispatch(chatActions.setCurrentChat(''))
	}

	return (
		member && <div className={s.chat} >
			<UserItem user={member} />
			<span onClick={() => deleteChat()}>x</span>
		</div>
	)
})