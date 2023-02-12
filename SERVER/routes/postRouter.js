const Router = require('express');
const postController = require('./controllers/postController');

const router = new Router();

router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.put('/like/:id', postController.likePost);
router.put('/dislike/:id', postController.dislikePost);
router.get('/:id', postController.getPost);
router.get('/timeline/:userId', postController.getTimeLinePosts);
router.get('/profile/:userId', postController.getProfilePosts);

module.exports = router;