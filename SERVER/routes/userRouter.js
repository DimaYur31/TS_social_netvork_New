const Router = require('express')
const router = new Router()
const userController = require('./controllers/userController')


router.get('/data/:id', userController.getUserData)
router.put('/:id', userController.update)
router.post('/photo/:id', userController.addPhoto)
router.delete('/photo/:id', userController.deletePhoto)
router.delete('/:id', userController.delete)
router.get('/', userController.getUser)// query params
router.get('/friends/:userId', userController.getFriends)
router.put('/:id/follow', userController.follow)
router.put('/:id/unfollow', userController.unfollow)


module.exports = router