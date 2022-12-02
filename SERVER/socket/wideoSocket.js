const { version, validate } = require('uuid')


const ACTIONS = require('../actions')

module.exports = {
	start: function (io) {

		const wideoSocket = io.of('/wideo')
		// ---------------------------------------------------------
		function getClientsRooms() {
			const { rooms } = io.sockets.adapter

			return Array.from(rooms.keys())
				.filter(roomID => validate(roomID) && version(roomID) === 4)
		}

		function shareRoomsInfo() {
			io.emit(ACTIONS.SHARE_ROOMS, {
				rooms: getClientsRooms()
			})
		}
		// ----------------------------------------------------
		wideoSocket.on('connection', wideoSocket => {
			shareRoomsInfo()

			wideoSocket.on(ACTIONS.JOIN, config => {
				const { room: roomID } = config
				const { rooms: joinedRooms } = wideoSocket

				if (Array.from(joinedRooms).includes(roomID)) {
					return console.warn(`Already joined to ${roomID}`)
				}

				const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || [])

				clients.forEach(clientID => {
					io.to(clientID).emit(ACTIONS.ADD_PEER, {
						perrID: wideoSocket.id,
						createOffer: false
					})

					wideoSocket.emit(ACTIONS.ADD_PEER, {
						perrID: clientID,
						createOffer: true
					})
				})

				const ACTIONS = require('./actions').join(roomID)
				shareRoomsInfo()
			})

			function leaveRoom() {
				const { rooms } = wideoSocket

				Array.from(rooms)
					.filter(roomID => validate(roomID) && version(roomID) === 4)//!!!!
					.forEach(roomID => {
						const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || [])

						clients.forEach(clientID => {
							io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
								peerID: wideoSocket.id
							})

							wideoSocket.emit(ACTIONS.REMOVE_PEER, {
								peerID: clientID
							})
						})

						wideoSocket.leave(roomID)
					})

				shareRoomsInfo()
			}

			wideoSocket.on(ACTIONS.LEAVE, leaveRoom)
			wideoSocket.on('disconnecting', leaveRoom)

			wideoSocket.on(ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
				io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
					peerID: wideoSocket.id,
					sessionDescription
				})
			})

			wideoSocket.on(ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
				io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
					peerID: wideoSocket.id,
					iceCandidate
				})
			})

		})
	}
}


// example

// io.on('connection', socket => {
	// shareRoomsInfo()

	// socket.on(ACTIONS.JOIN, config => {
	// 	const { room: roomID } = config
	// 	const { rooms: joinedRooms } = socket

	// 	if (Array.from(joinedRooms).includes(roomID)) {
	// 		return console.warn(`Already joined to ${roomID}`)
	// 	}

	// 	const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || [])

	// 	clients.forEach(clientID => {
	// 		io.to(clientID).emit(ACTIONS.ADD_PEER, {
	// 			perrID: socket.id,
	// 			createOffer: false
	// 		})

	// 		socket.emit(ACTIONS.ADD_PEER, {
	// 			perrID: clientID,
	// 			createOffer: true
	// 		})
	// 	})

	// 	socket.join(roomID)
	// 	shareRoomsInfo()
	// })

	// function leaveRoom() {
	// 	const { rooms } = socket

	// 	Array.from(rooms)
	// 		.filter(roomID => validate(roomID) && version(roomID) === 4)//!!!!
	// 		.forEach(roomID => {
	// 			const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || [])

	// 			clients.forEach(clientID => {
	// 				io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
	// 					peerID: socket.id
	// 				})

	// 				socket.emit(ACTIONS.REMOVE_PEER, {
	// 					peerID: clientID
	// 				})
	// 			})

	// 			socket.leave(roomID)
	// 		})

	// 	shareRoomsInfo()
	// }

	// socket.on(ACTIONS.LEAVE, leaveRoom)
	// socket.on('disconnecting', leaveRoom)

	// socket.on(ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
	// 	io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
	// 		peerID: socket.id,
	// 		sessionDescription
	// 	})
	// })

	// socket.on(ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
	// 	io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
	// 		peerID: socket.id,
	// 		iceCandidate
	// 	})
	// })

// })