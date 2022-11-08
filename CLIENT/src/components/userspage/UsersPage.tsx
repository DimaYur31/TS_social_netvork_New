import { useEffect } from 'react'
import Feed from '../homePage/feed/Feed'
//@ts-ignore
import s from './usersPage.module.css'
import { useAppSelector } from '../../hooks/reactReduxHooks';
import { useAppDispatch } from './../../hooks/reactReduxHooks';
import { getAllUsers } from '../../store/slices/apiActions/usersActions';
import UsersItem from './usersItem/UsersItem';

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
			<div>
				{users
					? users.map(user => {
						return <UsersItem key={user._id} currentUser={user} />

					})
					: null
				}
			</div>
		</div>
	)
}

export default UsersPage