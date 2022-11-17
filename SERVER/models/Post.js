const { Schema, model } = require('mongoose')

const Post = new Schema({
	userId: { type: String, required: true },
	text: { type: String, max: 500 },
	img: { type: String },
	likes: { type: Array, default: [] },
	dislikes: { type: Array, default: [] }
}, { timestamps: true })

module.exports = model('Post', Post)