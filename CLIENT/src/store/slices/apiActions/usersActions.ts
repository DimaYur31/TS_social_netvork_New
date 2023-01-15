import { getFriendsData, getUsers } from '../../../api/allUsersApi'
import { AppDispatch } from '../../store'
import { toggleLoading } from '../appSlice'
import { setFriends, setUsers } from '../usersSlice'

export const getAllUsers = (_id: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleLoading(true))

		const users = await getUsers(_id)

		dispatch(setUsers(users))
		dispatch(toggleLoading(false))
	}
}

export const getFriendsThunk = (id: string) => {
	return async (dispatch: AppDispatch) => {
		const friends = await getFriendsData(id)
		dispatch(setFriends(friends))
	}
}