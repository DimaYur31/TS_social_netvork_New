import { useEffect } from 'react'
import s from './usersPage.module.scss'
import { useAppSelector, useAppDispatch } from '../../hooks/reactReduxHooks'
import { getAllUsers } from '../../store/slices/apiActions/usersActions'

import Feed from '../homePage/feed/Feed'
import UsersItem from './usersItem/UsersItem'

const UsersPage = () => {
	const dispatch = useAppDispatch()
	const { _id } = useAppSelector(state => state.profilePage.defaultUser)
	const { users } = useAppSelector(state => state.usersPage)

	useEffect(() => {
		dispatch(getAllUsers(_id))
	}, [])

	return (
		<div className={s.usersPage}>
			<Feed />

			<div className={s.usersList}>
				{users?.map(user => {
					return <UsersItem key={user._id} thisUser={user} />
				})}
			</div>
		</div>
	)
}

export default UsersPage