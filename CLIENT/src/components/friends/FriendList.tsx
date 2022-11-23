import { useEffect } from 'react'
import { getFriendsThunk } from '../../store/slices/apiActions/usersActions'
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks'

import UserItem from '../elements/user-item/UserItem'

const FriendList = () => {
	const dispatch = useAppDispatch()
	const { _id, followings } = useAppSelector(state => state.profilePage.defaultUser)
	const { friends } = useAppSelector(state => state.usersPage)

	useEffect(() => {
		dispatch(getFriendsThunk(_id))
	}, [followings])

	return <ul>
		{
			friends.map((friend) => {
				return (
					<UserItem
						user={friend}
						key={friend._id}
					/>
				)
			})
		}
	</ul>
}

export default FriendList