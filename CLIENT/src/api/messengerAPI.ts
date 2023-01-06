import { ConversationType, MessageType } from '../types/conwersations'
import { authInstans } from './api'

export const fetchChats = async (userId: string) => {
	const { data } = await authInstans.get<ConversationType[]>(`api/conversations/${userId}`)
	return data
}

export const fetchMessages = async (conversationId: string) => {
	const { data } = await authInstans.get<MessageType[]>(`api/messages/${conversationId}`)
	return data
}