const Router = require('express')
const router = new Router()
const messagesController = require('./controllers/messagesController')

router.post('/', messagesController.addMessage)
router.get('/:conversationId', messagesController.getMessages)

module.exports = router