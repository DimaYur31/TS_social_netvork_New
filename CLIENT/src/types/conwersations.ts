export type MessageType = {
	_id: string;
	members: string[];
	createdAt: Date;
	updatedAt: Date;
}

export type ConversationType = {
	_id: string;
	conversationId: string;
	sender: string;
	text: string;
	createdAt: Date;
	updatedAt: Date;
}