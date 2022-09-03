require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const mongoose = require('mongoose')
const { version, validate } = require('uuid')
// const cors = require('cors')


const router = require('./routes/routes')
const corsMiddleware = require('./middleware/cors.middleware')
const app = express()
const server = require('http').createServer(app)
const PORT = process.env.PORT
const dbURL = process.env.DB_URL

const io = require('socket.io')(server)
const ACTIONS = require('./actions')


// app.use(cors())
app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json())
app.use('/api', router)

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


const start = async () => {
	try {
		await mongoose.connect(dbURL)

		io.on('connection', socket => {
			shareRoomsInfo()

			socket.on(ACTIONS.JOIN, config => {
				const { room: roomID } = config
				const { rooms: joinedRooms } = socket

				if (Array.from(joinedRooms).includes(roomID)) {
					return console.warn(`Already joined to ${roomID}`)
				}

				const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || [])

				clients.forEach(clientID => {
					io.to(clientID).emit(ACTIONS.ADD_PEER, {
						perrID: socket.id,
						createOffer: false
					})

					socket.emit(ACTIONS.ADD_PEER, {
						perrID: clientID,
						createOffer: true
					})
				})

				socket.join(roomID)
				shareRoomsInfo()
			})

			function leaveRoom() {
				const { rooms } = socket

				Array.from(rooms)
					.filter(roomID => validate(roomID) && version(roomID) === 4)//!!!!
					.forEach(roomID => {
						const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || [])

						clients.forEach(clientID => {
							io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
								peerID: socket.id
							})

							socket.emit(ACTIONS.REMOVE_PEER, {
								peerID: clientID
							})
						})

						socket.leave(roomID)
					})

				shareRoomsInfo()
			}

			socket.on(ACTIONS.LEAVE, leaveRoom)
			socket.on('disconnecting', leaveRoom)

			socket.on(ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
				io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
					peerID: socket.id,
					sessionDescription
				})
			})

			socket.on(ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
				io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
					peerID: socket.id,
					iceCandidate
				})
			})

		})

		server.listen(PORT, () => {
			console.log(`Server started on PORT, ${PORT}`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()