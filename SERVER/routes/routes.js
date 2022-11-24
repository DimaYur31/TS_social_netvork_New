const Router = require('express')
const router = new Router()

const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const postRouter = require('./postRouter')
const conversationRouter = require('./conversationsRouter')
const messagesRouter = require('./messagesRouter')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/conversations', conversationRouter)
router.use('/messages', messagesRouter)

module.exports = router