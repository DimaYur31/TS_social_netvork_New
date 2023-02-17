const Router = require('express');
const commentRouter = require('./controllers/commentConttroller');

const router = new Router();

router.post('/', commentRouter.createComment);
router.delete('/:id', commentRouter.deleteComment);
router.get('/:postId', commentRouter.getPostComments);
router.patch('/like/:id', commentRouter.likeComment);
router.patch('/dislike/:id', commentRouter.dislikeComment);

module.exports = router;