import { authInstans } from "./api"
import { UserChanges, UserType } from '../types/profile'

export const updateUser = async (userId: string, changes: UserChanges) => {
	const { data } = await authInstans.put<UserType>(`api/user/${userId}`, { userId, ...changes })
	return data
}

export const uploadPhoto = async (id: string, formData: FormData) => {
	const { data } = await authInstans.post<string>(`api/user/photo/${id}`, formData)
	return data
}

export const deletePhoto = async (userId: string, photo: string) => {
	const { status } = await authInstans.delete<number>(`api/user/photo/${userId}`, { data: { userId: userId, photo: photo } })
	return status
}

export const getUserData = async (id: string) => {
	const { data } = await authInstans.get<UserType>(`api/user/data/${id}`)
	return data
}

export const followUser = async (userId: string, id: string, isFollow: boolean) => {
	const { data } = isFollow
		? await authInstans.put<string[]>(`api/user/${id}/unfollow`, { userId })
		: await authInstans.put<string[]>(`api/user/${id}/follow`, { userId })
	return data
}

// export const deleteUser = async (userId:string, isAdmin = false) => {
// 	const { data } = await authInstans.delete(`api/user/${userId}`, { userId, isAdmin })
// 	return data
// }

// export const getUser = async () => {
// 	const { data } = await authInstans.get<UsersType>('api/user/')
// 	return data
// }

// export const getFriends = async (userId: string) => {
// 	const { data } = await authInstans.get(`api/user/friends/${userId}`)
// 	return data
// }