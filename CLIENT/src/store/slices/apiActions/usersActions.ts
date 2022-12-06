import { getFriendsData, getUsers } from "../../../api/allUsersApi"
import { getUserData } from "../../../api/userApi"
import { UserType } from "../../../types/profile"
// import { CurrentUser } from "../../../types/profile"
import { AppDispatch } from "../../store"
import { toggleLoading } from "../appSlice"
import { setCurrentUser, setRenderUser } from "../profileSlice"
import { setFriends, setUsers } from "../usersSlice"

export const getAllUsers = (_id: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleLoading(true))

		const users = await getUsers(_id)

		dispatch(setUsers(users))
		dispatch(toggleLoading(false))
	}
}

export const changeDefaultAndCurrentUsers = (defaultUser: UserType, id: string | undefined) => {
	return async (dispatch: AppDispatch) => {
		if (defaultUser._id !== id && id !== undefined) {
			dispatch(setRenderUser(defaultUser))
		} else {
			dispatch(toggleLoading(true))
			const currentUser = await getUserData(id)
			dispatch(setCurrentUser(currentUser))
			dispatch(setRenderUser(currentUser))
			dispatch(toggleLoading(false))
		}
	}
}

export const getFriendsThunk = (id: string) => {
	return async (dispatch: AppDispatch) => {
		const friends = await getFriendsData(id)
		dispatch(setFriends(friends))
	}
}