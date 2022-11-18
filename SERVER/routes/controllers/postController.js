const Post = require('../../models/Post')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')

class PostController {
	// create post
	async createPost(req, res) {
		try {
			const { img, userId, text } = req.body
			const dataPost = { userId, text, img }
			const newPost = new Post(dataPost)
			const savedPost = await newPost.save()
			const posts = await Post.find({ userId: savedPost.userId })

			res.status(200).json(posts)
		} catch (e) {
			res.status(500).json('error')
		}
	}

	// update post
	async updatePost(req, res) {
		try {
			const post = await Post.findById(req.params.id)

			if (post.userId === req.body.userId) {
				await post.updateOne({ $set: req.body })
				res.status(200).json('Редактирование прошло успешно')
			} else {
				res.status(403).json('Вы можете редактировать только свои посты')
			}
		} catch (e) {
			res.status(500).json(e)
		}
	}

	// delete post
	async deletePost(req, res) {
		try {

			const tokenArray = req.headers.authorization.split(' ')
			const token = jwt.decode(tokenArray[1])

			const post = await Post.findById(req.params.id)

			if (post.userId === token.id) {
				await post.deleteOne()
				res.status(200).json('Пост удален')
			} else {
				res.status(403).json('Вы не можете удалять посты других пользователей')
			}
		} catch (e) {
			res.status(500).json(e)
		}
	}

	// like 
	async likePost(req, res) {
		try {
			const post = await Post.findById(req.params.id)

			if (post.userId !== req.body.userId) {

				if (post.dislikes.includes(req.body.userId)) {
					await post.updateOne({ $pull: { dislikes: req.body.userId } }, { new: true })
				}
				if (!post.likes.includes(req.body.userId)) {
					await post.updateOne({ $push: { likes: req.body.userId } }, { new: true })
					const updatedPost = await Post.findById(req.params.id)

					res.status(200).json({ likes: updatedPost.likes, dislikes: updatedPost.dislikes })
				} else {
					await post.updateOne({ $pull: { likes: req.body.userId } }, { new: true })
					const updatedPost = await Post.findById(req.params.id)

					res.status(200).json({ likes: updatedPost.likes, dislikes: updatedPost.dislikes })
				}
			} else {
				res.status(200).json('вы не можете лайкать себе')
			}
		} catch (e) {
			res.status(500).json(e)
		}
	}

	// dislike
	async dislikePost(req, res) {
		try {
			const post = await Post.findById(req.params.id)

			if (post.userId !== req.body.userId) {

				if (post.likes.includes(req.body.userId)) {
					await post.updateOne({ $pull: { likes: req.body.userId } }, { new: true })
				}
				if (!post.dislikes.includes(req.body.userId)) {
					await post.updateOne({ $push: { dislikes: req.body.userId } }, { new: true })
					const updatedPost = await Post.findById(req.params.id)

					res.status(200).json({ likes: updatedPost.likes, dislikes: updatedPost.dislikes })
				} else {
					await post.updateOne({ $pull: { dislikes: req.body.userId } }, { new: true })
					const updatedPost = await Post.findById(req.params.id)

					res.status(200).json({ likes: updatedPost.likes, dislikes: updatedPost.dislikes })
				}
			} else {
				res.status(200).json('вы не можете поставить дислайк себе')
			}
		} catch (e) {
			res.status(500).json(e)
		}
	}

	// get a post
	async getPost(req, res) {
		try {
			const post = await Post.findById(req.params.id)
			res.status(200).json(post)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	// get timeline posts
	async getTimeLinePosts(req, res) {
		try {
			const user = await User.findById(req.params.userId)
			const userPosts = await Post.find({ userId: user._id })
			const followingsPosts = await Promise.all(
				user.followings.map(friendId => {
					return Post.find({ userId: friendId })
				})
			)

			if (followingsPosts.length) {
				res.status(200).json([...userPosts, ...followingsPosts[0]])
			} else {
				res.status(200).json(userPosts)
			}
		} catch (e) {
			res.status(500).json(e)
		}
	}

	// get user's all posts
	async getProfilePosts(req, res) {
		try {
			const posts = await Post.find({ userId: req.params.userId })
			res.status(200).json(posts)
		} catch (e) {
			res.status(500).json(e)
		}
	}
}

module.exports = new PostController()