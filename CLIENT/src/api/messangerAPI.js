import { authInstans } from './api'

export const fetchChats = async (userId) => {
	const { data } = await authInstans.get(`/conversations/${userId}`)
	return data
}

export const fetchMessages = async (conversationId) => {
	const { data } = await authInstans.get(`/messages/${conversationId}`)
	return data
}