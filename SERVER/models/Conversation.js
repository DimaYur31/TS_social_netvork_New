const mongoose = require('mongoose');

const ConversationShima = new mongoose.Schema({
	members: { type: Array }
}, { timestamps: true });

module.exports = mongoose.model('Conversation', ConversationShima);