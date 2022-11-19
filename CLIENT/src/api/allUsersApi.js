import { authInstans } from "./api"

export const getUsers = async (userId) => {
	const { data } = await authInstans.get(`api/user/users/${userId}`)
	return data
}

export const getFriendsData = async (id) => {
	const { data = [] } = await authInstans.get(`api/user/friends/${id}`)
	return data
}
