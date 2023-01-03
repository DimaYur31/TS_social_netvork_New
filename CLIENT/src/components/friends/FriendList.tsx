import React, { useEffect } from 'react'
import { getFriendsThunk } from '../../store/slices/apiActions/usersActions'
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks'
import { selectDefaultUser, selectFriends } from '../../selectors/selectors'

import UserItem from '../elements/user-item/UserItem'

const FriendList = () => {
	console.log('FriendList render')
	const dispatch = useAppDispatch()
	const { _id, followings } = useAppSelector(selectDefaultUser)
	const friends = useAppSelector(selectFriends)

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

export default React.memo(FriendList)