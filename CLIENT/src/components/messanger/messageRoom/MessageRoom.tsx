import { FC, useEffect, useState } from 'react'
import { ConversationType } from '../../../types/conwersations'
import { UserType } from '../../../types/profile'
import { getUserData } from '../../../api/userApi'

import UserItem from '../../elements/user-item/UserItem'

type RoomProps = {
	userId: string
	room: ConversationType
}

const MessageRoom: FC<RoomProps> = ({ room, userId }) => {
	const [member, setMember] = useState<UserType | null>(null)
	const user = room.members.find(id => id !== userId)

	let fetchData = async () => {
		await getUserData(user)
			.then(data => setMember(data))
	}

	useEffect(() => {
		fetchData()
	}, [user])

	return (
		member && <div>
			<UserItem user={member} />
		</div>
	)
}

export default MessageRoom