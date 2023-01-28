import { fetchChats, fetchMessages, createChat } from '../../../api/messengerAPI'
import { AppDispatch } from '../../store'
import { appActions } from '../appSlice'
import { chatActions } from '../chatSlice'

export const getChatsThunk = (userId: string) => {
	return async (dispatch: AppDispatch) => {
		const chats = await fetchChats(userId)
		dispatch(chatActions.getChats(chats))
	}
}

export const createConversationThunc = (senderId: string, receiverId: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(appActions.toggleLoading(true))
		const chat: any = await createChat(senderId, receiverId)
		dispatch(chatActions.addChat(chat))
		dispatch(appActions.toggleLoading(false))
		return chat._id
	}
}

export const getMessagesThunk = (conversationId: string) => {
	return async (dispatch: AppDispatch) => {
		const messages = await fetchMessages(conversationId)
		dispatch(chatActions.getChatMessages(messages))
	}
}
