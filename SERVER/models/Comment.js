const { Schema, model } = require('mongoose');

const Comment = new Schema({
	postId: { type: String, required: true },
	commentatorId: { type: String },
	text: { type: String, max: 500 },
	likes: { type: Array, default: [] },
	dislikes: { type: Array, default: [] }
}, { timestamps: true });

module.exports = model('Comment', Comment);