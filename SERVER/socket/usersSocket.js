const Conversation = require("../models/Conversation")
const Message = require("../models/Message")

let users = []

const addUser = (userId, socketId) => {
	!users.some(user => user.userId === userId) &&
		users.push({ userId, socketId })
};

const removeUser = (socketId) => {
	users = users.filter(user => user.socketId !== socketId)
};

const getUser = (userId) => {
	return users.find(user => user.userId === userId)
};

module.exports = {
	start: function (io) {

		const sendToConversationMembers = async (conversationId, action, payload) => {
			const conversation = await Conversation.findById(conversationId)

			conversation.members.forEach(member => {
				io.to(member).emit(action, payload)
			})
		}

		io.on('connection', socket => {

			socket.on('addUser', userId => {
				addUser(userId, socket.id)
				io.emit('getUsers', users)
			})

			socket.on('sendMessage', async ({ sender, conversationId, text }) => {
				const newMessage = new Message({ sender, conversationId, text })

				await newMessage.save()
				await sendToConversationMembers(conversationId, 'getMessage', newMessage)
			})

			socket.on('editMessage', async ({ messageId, text }) => {
				const message = await Message.findById(messageId)

				await message.updateOne({ text }, { new: true })
				await message.save()
				await sendToConversationMembers(message.conversationId, 'updateMessage', message)
			})

			socket.on('deleteMessage', async messageId => {
				const message = await Message.findById(messageId)

				await message.deleteOne()
			})

			socket.on('deleteConversation', async conversationId => {
				await Message.deleteMany({ conversationId })
				await Conversation.deleteOne({ _id: conversationId })

				io.emit("deleteConversations", conversationId)
			})

			socket.on('disconnect', () => {
				// console.log('a user disconnected!')
				removeUser(socket.id);
				io.emit("getUsers", users);
			})
		})
	}
}