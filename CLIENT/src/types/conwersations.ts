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

export type AddConversations = {
	senderId: string
	receiverId: string
}