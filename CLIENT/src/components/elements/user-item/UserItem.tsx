import { getPhoto } from "../../../hooks/hooks"
import { UsersType } from "../../../types/profile"
import IsOnline from "../../styleedComponents/IsOnline"
import SmalAvatar from "../../styleedComponents/SmalAvatar"
import s from './UserItem.module.css'

interface IProps {
	user: UsersType
	isDB?: boolean
}

const UserItem: React.FC<IProps> = ({ user, isDB }) => {
	return <li className={s.list}>
		<SmalAvatar src={getPhoto(user.avatar, isDB)} />
		<IsOnline isOnline={false} />
		<p>{user.name}</p>
	</li>
}

export default UserItem