import { fetchChats, fetchMessages } from '../../../api/messengerAPI'
import { AppDispatch } from '../../store'
import { getChatMessages, getChats } from '../chatSlice'

export const getChatsThunk = (userId: string) => {
	return async (dispatch: AppDispatch) => {
		const chats = await fetchChats(userId)
		dispatch(getChats(chats))
	}
}

export const getMessagesThunk = (conversationId: string) => {
	return async (dispatch: AppDispatch) => {
		const chats = await fetchMessages(conversationId)
		dispatch(getChatMessages(chats))
	}
}
