const Router = require('express')
const router = new Router()
const postController = require('./controllers/postController')

router.post('/', postController.createPost)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)
router.put('/like/:id', postController.likeDislikePost)
router.get('/:id', postController.getPost)
router.get('/timeline/:userId', postController.getTimeLinePosts)
router.get('/profile/:userId', postController.getProfilePosts)

module.exports = router