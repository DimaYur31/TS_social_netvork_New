const Router = require('express')
const router = new Router()
const conversationController = require('./controllers/conversationsController')

router.post('/', conversationController.createConversation)
router.get('/:userId', conversationController.getUserConversations)

module.exports = router