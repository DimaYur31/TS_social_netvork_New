import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/reactReduxHooks'
import { getAllUsers } from '../../store/slices/apiActions/usersActions'
import { selectDefaultUserId, selectUsers } from '../../selectors/selectors'
import s from './usersPage.module.scss'

import Feed from '../homePage/feed/Feed'
import UsersItem from './usersItem/UsersItem'

const UsersPage = () => {
	const dispatch = useAppDispatch()
	const _id = useAppSelector(selectDefaultUserId)
	const users = useAppSelector(selectUsers)

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

export default React.memo(UsersPage)