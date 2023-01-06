import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/reactReduxHooks'
import { getPhoto, useAvatar, useIsOwner, useRenderUser } from '../../../hooks/hooks'
import { selectProfileState } from '../../../selectors/selectors'
import s from './MyInfo.module.scss'

import AddPostPopap from '../../elements/popap/AddPostPopap'
import FollowButton from '../../elements/btn/isFollow/FolLowButton'
import { UserType } from '../../../types/profile'

const MyInfo: React.FC<{ user: UserType }> = ({ user }) => {
	// const { renderUser } = useAppSelector(selectProfileState)
	const avatar = useAvatar()
	const isOwner = useIsOwner()

	console.log('MyInfo render')

	useRenderUser()

	return (
		<div className={s.user}>
			<div>
				<img src={getPhoto(user.coverPicture)} />
			</div>

			<div className={s.info} >
				<img src={avatar} />
				{isOwner
					? <AddPostPopap />
					: <FollowButton currentUserId={user._id} />}
			</div>

		</div>
	)
}

export default React.memo(MyInfo)