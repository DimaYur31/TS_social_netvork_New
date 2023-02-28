const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/routes')
const usersSocket = require('./socket/usersSocket')
// const corsMiddleware = require('./middleware/cors.middleware')
require('dotenv').config()

const app = express()
const server = require('http').createServer(app)
const PORT = process.env.PORT
const dbURL = process.env.DB_URL
const io = require('socket.io')(server)

app.use(fileUpload({}))
app.use(cors())
// app.use(corsMiddleware)
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json())
app.use('/api', router)


const start = async () => {
	try {
		await mongoose.connect(dbURL)
		usersSocket.start(io)

		server.listen(PORT, () => {
			console.log(`Server started on PORT, ${PORT}`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()