import { authInstans } from "./api"

export const getUsers = async (userId) => {
	const { data } = await authInstans.get(`api/user/users/${userId}`)
	return data
}

