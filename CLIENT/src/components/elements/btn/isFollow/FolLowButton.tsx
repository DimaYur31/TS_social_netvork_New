import { FC, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../hooks/reactReduxHooks'
import { followUnfollowThunk } from '../../../../store/slices/apiActions/userActions'
//@ts-ignore
import s from './FollowButton.module.css'
type TypeProps = {
	currentUserId: string
}

const FollowButton: FC<TypeProps> = ({ currentUserId }) => {
	const dispatch = useAppDispatch()
	const { followings, _id } = useAppSelector(state => state.profilePage.defaultUser)
	const [isFollowed, setIsFollowed] = useState(followings.includes(currentUserId))
	const activeClass = isFollowed && `${s.isActive}`
	const handleFollowed = () => {
		dispatch(followUnfollowThunk(_id, currentUserId, isFollowed))
			.then((fallowed) => setIsFollowed(fallowed))
	}



	return <button
		className={`${s.buttonFollowed} ${activeClass}`}
		onClick={handleFollowed}
	>
		{isFollowed ? 'unfollow -' : 'follow +'}
	</button>
}

export default FollowButton