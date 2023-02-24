export type ConversationType = {
	_id: string;
	members: string[];
	createdAt: Date;
	updatedAt: Date;
}

export type MessageType = {
	_id: string;
	conversationId: string;
	sender: string;
	text: string;
	createdAt: Date;
	updatedAt: Date;
}

export type chatsStateType = {
	chats: ConversationType[],
	currentChat: string,
	messages: MessageType[]
}

export type AddMeassageType = Pick<MessageType, 'conversationId' | 'sender' | 'text'>

export type AddConversations = {
	senderId: string
	receiverId: string
}

export type SocketUser = {
	socketId: string
	userId: string
}

export type SocketUsers = SocketUser[]