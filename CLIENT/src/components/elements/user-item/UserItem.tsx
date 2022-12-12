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
	return (
		<li className={s.list}>
			<SmalAvatar src={getPhoto(user.avatar, isDB)} />
			<IsOnline isOnline={false} />
			<p>{user.name}</p>
		</li>
	)
}

export default UserItem