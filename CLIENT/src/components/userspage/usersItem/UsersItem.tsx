import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './userItem.module.scss'
import { UserType } from '../../../types/profile'
import { getPhoto } from '../../../hooks/hooks'

import FollowButton from '../../elements/btn/isFollow/FolLowButton'

type propsType = {
	currentUser: UserType
}

const UsersItem: FC<propsType> = ({ currentUser }) => {
	const { avatar, surname, name, _id } = currentUser

	return (
		<div className={s.usersItem}>
			<Link to={`/profile/${_id}`}>
				<div className={s.image}>
					<img src={getPhoto(avatar)} />
				</div>
				<h3>{name}</h3>
				<h3>{surname}</h3>
			</Link>
			<div className={s.btns} >
				<FollowButton currentUserId={currentUser._id} />
			</div>
		</div >
	)
}

export default UsersItem