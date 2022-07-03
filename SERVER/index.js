require('dotenv').config()
const express = require('express')
// const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
// const helmet = require('helmet')
// const morgan = require('morgan')

const mongoose = require('mongoose')
const router = require('./routes/routes')
const corsMiddleware = require('./middleware/cors.middleware')
// const config = require('config')

const app = express()
const PORT = process.env.PORT
const dbURL = process.env.DB_URL


// app.use(cors())
app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json())
// app.use(helmet())
// app.use(morgan('common'))

app.use('/api', router)
console.log(__dirname)

const start = async () => {
	try {
		await mongoose.connect(dbURL)
		app.listen(PORT, () => {
			console.log(`Server started on PORT, ${PORT}`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()