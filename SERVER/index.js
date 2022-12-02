require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const mongoose = require('mongoose')
// const cors = require('cors')

const router = require('./routes/routes')
const corsMiddleware = require('./middleware/cors.middleware')
const wideoSocket = require('./socket/wideoSocket')

const app = express()
const server = require('http').createServer(app)
const PORT = process.env.PORT
const dbURL = process.env.DB_URL

const io = require('socket.io')(server)

// app.use(cors())
app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json())
app.use('/api', router)

wideoSocket.start(io)


const start = async () => {
	try {
		await mongoose.connect(dbURL)
		// io.on('connection', socket => {


		// })
		server.listen(PORT, () => {
			console.log(`Server started on PORT, ${PORT}`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()