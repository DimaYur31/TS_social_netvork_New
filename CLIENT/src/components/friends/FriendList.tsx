import { useEffect } from 'react'
import { getFriendsThunk } from '../../store/slices/apiActions/usersActions'
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks'
import FriendItem from './FriendItem'
//@ts-ignore
import s from './Friendlist.module.css'

const FriendList = () => {
	const dispatch = useAppDispatch()
	const { _id, followings } = useAppSelector(state => state.profilePage.defaultUser)
	const { friends } = useAppSelector(state => state.usersPage)

	useEffect(() => {
		dispatch(getFriendsThunk(_id))
	}, [followings])

	return <ul className={s.frienfList}>
		{
			friends.map((friend) => {
				return (
					<FriendItem
						friend={friend}
						key={friend._id}
					/>
				)
			})
		}
	</ul>
}

export default FriendList