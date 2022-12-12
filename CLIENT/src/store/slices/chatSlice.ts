import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ConversationType, MessageType, chatsStateType } from '../../types/conwersations'

const initialState = {
	chats: [] as ConversationType[],
	currentChat: '' as string,
	messages: [] as MessageType[]

}

const chatSlice = createSlice({
	name: 'chatSlice',
	initialState,
	reducers: {
		getChats(stare: chatsStateType, action: PayloadAction<ConversationType[]>) {
			stare.chats = action.payload
		},//+

		setCurrentChat(state: chatsStateType, action: PayloadAction<string>) {
			state.currentChat = action.payload
		},//-

		addChat(state: chatsStateType, action: PayloadAction<ConversationType>) {
			state.chats.push(action.payload)
		},

		getChatMessages(state: chatsStateType, action: PayloadAction<MessageType[]>) {
			state.messages = action.payload
		},//+


		getMessage(state: chatsStateType, action: PayloadAction<MessageType>) {
			state.messages.push(action.payload)
		},//-

		removeChat(state: chatsStateType, action: PayloadAction<string>) {
			state.chats = state.chats.filter(chat => chat._id !== action.payload)
		},//-

		removeMessage(state: chatsStateType, action: PayloadAction<string>) {
			state.messages = state.messages.filter(message => message._id !== action.payload)
		}//-
		// editMessage
	}
})

export const {
	getChats, setCurrentChat, getChatMessages,
	removeChat, removeMessage, getMessage
} = chatSlice.actions

export default chatSlice.reducer