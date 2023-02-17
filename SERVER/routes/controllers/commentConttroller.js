const jwt = require('jsonwebtoken');
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

class CommentController {
	async createComment(req, res) {
		try {
			const newComent = new Comment(req.body);
			const post = await Post.findById(req.body.postId);

			await newComent.save();
			await post.updateOne({ $push: { comments: newComent._id } }, { new: true });

			res.status(200).json(post);
		} catch (error) {
			res.status(500).json(error);
		};
	};

	async deleteComment(req, res) {
		try {
			const tokenArray = req.headers.authorization.split(' ');
			const token = jwt.decode(tokenArray[1]);

			const comment = await Comment.findById(req.params.id);
			const post = await Post.findById(comment.postId);


			if (comment.userId === token.id) {
				await post.updateOne({ $pull: { comments: comment._id } }, { new: true });

				await comment.deleteOne();

				res.status(200).json(comment);
			} else {
				res.status(403).json('Вы не можете удалять комментарии других пользователей');
			}
		} catch (error) {
			res.status(500).json(error);
		};
	};

	async likeComment(req, res) {
		try {
			const comment = await Comment.findById(req.params.id);
			if (comment.commentatorId !== req.body.userId) {
				if (comment.dislikes.includes(req.body.userId)) {
					await comment.updateOne({ $pull: { dislikes: req.body.userId } }, { new: true });
				};

				if (!comment.likes.includes(req.body.userId)) {
					await comment.updateOne({ $push: { likes: req.body.userId } }, { new: true });
					const updatedComment = await Comment.findById(req.params.id);

					res.status(200).json({ likes: updatedComment.likes, dislikes: updatedComment.dislikes });
				} else {
					await comment.updateOne({ $pull: { likes: req.body.userId } }, { new: true });
					const updatedComment = await Comment.findById(req.params.id);

					res.status(200).json({ likes: updatedComment.likes, dislikes: updatedComment.dislikes });
				}
			} else {
				res.status(200).json('вы не можете лайкать свои комментарии');
			}
		} catch (error) {
			res.status(500).json(error);
		};
	};

	async dislikeComment(req, res) {
		try {
			const comment = await Comment.findById(req.params.id);

			if (comment.commentatorId !== req.body.userId) {
				if (comment.likes.includes(req.body.userId)) {
					await comment.updateOne({ $pull: { likes: req.body.userId } }, { new: true });
				}

				if (!comment.dislikes.includes(req.body.userId)) {
					await comment.updateOne({ $push: { dislikes: req.body.userId } }, { new: true });
					const updatedComment = await Comment.findById(req.params.id);

					res.status(200).json({ likes: updatedComment.likes, dislikes: updatedComment.dislikes });
				} else {
					await comment.updateOne({ $pull: { dislikes: req.body.userId } }, { new: true });
					const updatedComment = await Comment.findById(req.params.id);

					res.status(200).json({ likes: updatedComment.likes, dislikes: updatedComment.dislikes });
				};
			} else {
				res.status(200).json('вы не можете поставить дислайк себе');
			};
		} catch (error) {
			res.status(500).json(error);
		};
	};

	async getPostComments(req, res) {
		try {
			const coments = await Comment.find({ postId: req.params.postId });
			res.status(200).json(coments);
		} catch (error) {
			res.status(500).json(error);
		};
	};

};

module.exports = new CommentController();