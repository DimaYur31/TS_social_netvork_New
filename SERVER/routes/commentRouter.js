const Router = require('express');
const commentRouter = require('./controllers/commentConttroller');

const router = new Router();

router.post('/', commentRouter.createComment);
router.delete('/:id', commentRouter.deleteComment);
router.get('/:id', commentRouter.getPostComments);
router.put('/like/:id', commentRouter.likeComment);
router.put('/dislike/:id', commentRouter.dislikeComment);

module.exports = router;