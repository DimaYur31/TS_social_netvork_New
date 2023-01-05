import React from 'react'
import { getPhoto } from "../../../hooks/hooks"
import { UsersType } from "../../../types/profile"
import s from './UserItem.module.scss'

import IsOnline from "../../styleedComponents/IsOnline"
import SmalAvatar from "../../styleedComponents/SmalAvatar"

interface IProps {
	user: UsersType
	isDB?: boolean
}

const UserItem: React.FC<IProps> = ({ user, isDB }) => {
	console.log('UserItem render')
	return (
		<li className={s.list}>
			<SmalAvatar src={getPhoto(user.avatar, isDB)} />
			<IsOnline isOnline={false} />
			<p>{user.name}</p>
		</li>
	)
}

export default React.memo(UserItem)