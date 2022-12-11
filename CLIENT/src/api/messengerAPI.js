import { authInstans } from './api'

export const fetchChats = async (userId) => {
	const { data } = await authInstans.get(`api/conversations/${userId}`)
	return data
}

export const fetchMessages = async (conversationId) => {
	const { data } = await authInstans.get(`api/messages/${conversationId}`)
	return data
}