const Message = require('../../models/Message')

class messageController {

	async addMessage(req, res) {
		try {
			const newMessage = new Message(req.body)
			const savedMessage = await newMessage.save()
			res.status(200).json(savedMessage)
		} catch (error) {
			res.status(500).json(error)
		}
	}

	async getMessages(req, res) {
		try {
			const messages = await Message.find({ conversationId: req.params.conversationId })
			res.status(200).json(messages)
		} catch (error) {
			res.status(500).json(error)
		}
	}
}

module.exports = new messageController()