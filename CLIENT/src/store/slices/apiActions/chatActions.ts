import { fetchChats, fetchMessages, createChat } from '../../../api/messengerAPI'
import { AppDispatch } from '../../store'
import { toggleLoading } from '../appSlice'
import { addChat, getChatMessages, getChats } from '../chatSlice'

export const getChatsThunk = (userId: string) => {
	return async (dispatch: AppDispatch) => {
		const chats = await fetchChats(userId)
		dispatch(getChats(chats))
	}
}

export const createConversationThunc = (senderId: string, receiverId: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleLoading(true))
		const chat = await createChat(senderId, receiverId)
		dispatch(addChat(chat))
		dispatch(toggleLoading(false))
	}
}

export const getMessagesThunk = (conversationId: string) => {
	return async (dispatch: AppDispatch) => {
		const messages = await fetchMessages(conversationId)
		dispatch(getChatMessages(messages))
	}
}
