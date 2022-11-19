import { authInstans } from "./api"

export const updateUser = async (userId, changes) => {
	const { data } = await authInstans.put(`api/user/${userId}`, { userId, ...changes })
	return data
}

export const uploadPhoto = async (id, formData) => {
	const { data } = await authInstans.post(`api/user/photo/${id}`, formData)
	return data
}

export const deletePhoto = async (userId, photo) => {
	const { status } = await authInstans.delete(`api/user/photo/${userId}`, { data: { userId: userId, photo: photo } })
	return status
}

export const deleteUser = async (userId, isAdmin = false) => {
	const { data } = await authInstans.delete(`api/user/${userId}`, { userId, isAdmin })
	return data
}

export const getUser = async () => {
	const { data } = await authInstans.get('api/user/')
	return data
}

export const getUserData = async (id) => {
	const { data } = await authInstans.get(`api/user/data/${id}`)
	return data
}

export const getFriends = async (userId) => {
	const { data } = await authInstans.get(`api/user/friends/${userId}`)
	return data
}

export const followUser = async (userId, id, isFollow) => {
	const { data } = isFollow
		? await authInstans.put(`api/user/${id}/unfollow`, { userId })
		: await authInstans.put(`api/user/${id}/follow`, { userId })
	return data
}
