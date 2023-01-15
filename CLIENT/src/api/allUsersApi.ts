import { UserType } from '../types/profile'

import { authInstans } from './api'

export const getUsers = async (userId: string) => {
	const { data } = await authInstans.get<UserType[]>(`api/user/users/${userId}`)
	return data
}

export const getFriendsData = async (id: string) => {
	const { data = [] } = await authInstans.get<UserType[]>(`api/user/friends/${id}`)
	return data
}
