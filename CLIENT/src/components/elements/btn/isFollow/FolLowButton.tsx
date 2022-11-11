import { FC, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../hooks/reactReduxHooks'
import { followUnfollowThunk } from '../../../../store/slices/apiActions/userActions'

type TypeProps = {
	currentUserId: string
}

const FollowButton: FC<TypeProps> = ({ currentUserId }) => {
	const dispatch = useAppDispatch()
	const { followings, _id } = useAppSelector(state => state.profilePage.defaultUser)
	const [isFollowed, setIsFollowed] = useState(followings.includes(currentUserId))

	const handleFollowed = () => {
		dispatch(followUnfollowThunk(_id, currentUserId, isFollowed))
			.then((fallowed) => setIsFollowed(fallowed))
	}

	return <button onClick={handleFollowed}>
		{isFollowed ? 'unfollow -' : 'follow +'}
	</button>
}

export default FollowButton