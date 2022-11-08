import { getUsers } from "../../../api/allUsersApi"
import { AppDispatch } from "../../store"
import { toggleLoading } from "../appSlice"
import { setUsers } from "../usersSlice"

export const getAllUsers = (_id: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleLoading(true))

		const users = await getUsers(_id)

		dispatch(setUsers(users))
		dispatch(toggleLoading(false))
	}
}