const Router = require('express');
const conversationController = require('./controllers/conversationsController');

const router = new Router();

router.post('/', conversationController.createConversation);
router.get('/:userId', conversationController.getUserConversations);

module.exports = router;