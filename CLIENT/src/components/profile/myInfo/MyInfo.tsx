import React from 'react'

import { usePhotosPath, useIsOwner } from '../../../hooks/hooks'
import { UserType } from '../../../types/profile'


import AddPostPopap from '../../elements/popap/AddPostPopap'
import FollowButton from '../../elements/btn/isFollow/FolLowButton'

import s from './MyInfo.module.scss'

const MyInfo: React.FC<{ user: UserType }> = ({ user }) => {
	const isOwner = useIsOwner(user._id)

	return (
		<div className={s.user}>
			<div>
				<img src={usePhotosPath(user.coverPicture)} />
			</div>

			<div className={s.info} >
				<img src={usePhotosPath(user.avatar)} />
				{isOwner
					? <AddPostPopap />
					: <FollowButton currentUserId={user._id} />}
			</div>
		</div>
	)
}

export default React.memo(MyInfo)