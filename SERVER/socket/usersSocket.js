const Conversation = require("../models/Conversation")
const Message = require("../models/Message");
const socketActions = require("./actions");

let users = []

const addUser = (userId, socketId) => {
	!users.some(user => user.userId === userId) &&
		users.push({ userId, socketId })
};

const removeUser = (socketId) => {
	users = users.filter(user => user.socketId !== socketId)
};

module.exports = {
	start: function (io) {

		const sendToConversationMembers = async (conversationId, action, payload) => {
			const conversation = await Conversation.findById(conversationId)

			conversation.members.forEach(member => {
				io.to(member).emit(action, payload)
			})
		}

		io.on(socketActions.CONNECTION, socket => {

			socket.on(socketActions.ADD_USER, userId => {
				addUser(userId, socket.id)
				io.emit('getUsers', users)
			})

			socket.on(socketActions.SEND_MESSAGE, async ({ sender, conversationId, text }) => {
				const newMessage = new Message({ sender, conversationId, text })

				await newMessage.save()
				await sendToConversationMembers(conversationId, 'getMessage', newMessage)
			})

			socket.on(socketActions.EDIT_MESSAGE, async ({ messageId, text }) => {
				const message = await Message.findById(messageId)

				await message.updateOne({ text }, { new: true })
				await message.save()
				await sendToConversationMembers(message.conversationId, 'updateMessage', message)
			})

			socket.on(socketActions.DELETE_MESSAGE, async messageId => {
				const message = await Message.findById(messageId)

				await message.deleteOne()
			})

			socket.on(socketActions.DELETE_CONVERSATION, async conversationId => {
				await Message.deleteMany({ conversationId })
				await Conversation.deleteOne({ _id: conversationId })

				io.emit(socketActions.DELETE_CONVERSATION, conversationId)
			})

			socket.on(socketActions.DISCONNECT, () => {
				console.log('a user disconnected!')
				removeUser(socket.id);
				io.emit("getUsers", users);
			})
		})
	}
}