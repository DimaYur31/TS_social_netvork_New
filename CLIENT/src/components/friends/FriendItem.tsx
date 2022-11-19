import SmalAvatar from '../styleedComponents/SmalAvatar'
import IsOnline from '../styleedComponents/IsOnline'
import { UsersType } from '../../types/profile'
import { getPhoto } from '../../hooks/hooks'

interface IProps {
	friend: UsersType
}

const FriendItem: React.FC<IProps> = ({ friend }) => {
	return <li>
		<SmalAvatar src={getPhoto(friend.avatar)} />
		<IsOnline isOnline={false} />
		<p>{friend.name}</p>
	</li>
}

export default FriendItem