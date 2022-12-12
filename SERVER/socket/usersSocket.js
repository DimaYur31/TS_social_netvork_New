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
		io.on('connection', socket => {

			socket.on('addUser', userId => {
				addUser(userId, socket.id)
				io.emit('getUsers', users)
			})

			socket.on('sendMessage', ({ sender, conversationId, text }) => {

				const createMessage = async () => {
					const newMessage = new Message({ sender, conversationId, text })
					await newMessage.save()

					const conversation = await Conversation.findById(conversationId)

					conversation.members.forEach(member => {
						io.to(member).emit('getMessage', newMessage)//ddd
					})
				}

				createMessage()
				// , {
				//   senderId,
				//   text,
				// })
			})

			socket.on('disconnect', () => {
				console.log('a user disconnected!')
				removeUser(socket.id);
				io.emit("getUsers", users);
			})
		})
	}
}