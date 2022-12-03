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
			console.log(socket)

			socket.on('addUser', userId => {
				console.log(userId)
				addUser(userId, socket.id)
				io.emit('getUsers', users)
			})



			socket.on('disconnect', () => {
				console.log('a user disconnected!')
				removeUser(socket.id);
				io.emit("getUsers", users);
			})
		})
	}
}