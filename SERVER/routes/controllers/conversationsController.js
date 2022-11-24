const Conversation = require('../../models/Conversation')

class ConversationController {
	async createConversation(req, res) {
		try {
			const newConversation = new Conversation({
				members: [req.body.senderId, req.body.receiverId]
			})
			const savedConwersation = await newConversation.save()
			res.status(200).json(savedConwersation)
		} catch (error) {
			res.status(500).json(error)
		}
	}

	async getUserConversations(req, res) {
		try {
			const conversations = await Conversation.find({
				members: { $in: [req.params.userId] }
			})
			res.status(200).json(conversations)
		} catch (error) {
			res.status(500).json(error)
		}
	}
}

module.exports = new ConversationController()