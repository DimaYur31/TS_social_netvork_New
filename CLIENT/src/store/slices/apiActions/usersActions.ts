import { getFriendsData, getUsers } from '../../../api/allUsersApi'
import { AppDispatch } from '../../store'
import { appActions } from '../appSlice'
import { userActions } from '../usersSlice'

export const getAllUsers = (_id: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(appActions.toggleLoading(true))
		const users = await getUsers(_id)
		dispatch(userActions.setUsers(users))
		dispatch(appActions.toggleLoading(false))
	}
}

export const getFriendsThunk = (id: string) => {
	return async (dispatch: AppDispatch) => {
		const friends = await getFriendsData(id)
		dispatch(userActions.setFriends(friends))
	}
}