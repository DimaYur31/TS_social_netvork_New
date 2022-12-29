import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './MyInfo.module.scss'
import { useAppSelector } from '../../../hooks/reactReduxHooks'
import { getPhoto, useAvatar, useIsOwner, useRenderUser } from '../../../hooks/hooks'

import AddPostPopap from '../../elements/popap/AddPostPopap'
import FollowButton from '../../elements/btn/isFollow/FolLowButton'

const MyInfo: React.FC = () => {
	const navigate = useNavigate()
	const { renderUser, isAuth } = useAppSelector(state => state.profilePage)
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

export default MyInfo