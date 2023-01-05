import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/reactReduxHooks'
import { getPhoto, useAvatar, useIsOwner, useRenderUser } from '../../../hooks/hooks'
import { selectProfileState } from '../../../selectors/selectors'
import s from './MyInfo.module.scss'

import AddPostPopap from '../../elements/popap/AddPostPopap'
import FollowButton from '../../elements/btn/isFollow/FolLowButton'

const MyInfo: React.FC = () => {
	console.log('MyInfo render')
	const navigate = useNavigate()
	const { renderUser, isAuth } = useAppSelector(selectProfileState)
	const avatar = useAvatar()
	const isOwner = useIsOwner()


	useRenderUser()

	useEffect(() => {
		if (!isAuth) {
			navigate('/login')
		}
	}, [isAuth])

	return (
		<div className={s.user}>
			<div>
				<img src={getPhoto(renderUser.coverPicture)} />
			</div>

			<div className={s.info} >
				<img src={avatar} />
				{isOwner
					? <AddPostPopap />
					: <FollowButton currentUserId={renderUser._id} />}
			</div>

		</div>
	)
}

export default React.memo(MyInfo)