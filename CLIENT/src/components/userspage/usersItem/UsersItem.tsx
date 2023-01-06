import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { UserType } from '../../../types/profile'
import { getPhoto } from '../../../hooks/hooks'
import { SVG } from '../../../img/icons/exportIcons'
import { useAppSelector } from '../../../hooks/reactReduxHooks'
import { selectChats } from '../../../selectors/selectors'
import s from './userItem.module.scss'

import FollowButton from '../../elements/btn/isFollow/FolLowButton'

type propsType = {
	thisUser: UserType
}

const UsersItem: FC<propsType> = ({ thisUser }) => {
	const { avatar, surname, name, _id } = thisUser
	const chats = useAppSelector(selectChats)

	const getChat = () => {
		console.log(chats)
	}

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
				<FollowButton currentUserId={thisUser._id} />
				<span onClick={() => getChat()}><SVG.AddChat /></span>
			</div>
		</div >
	)
}

export default React.memo(UsersItem)