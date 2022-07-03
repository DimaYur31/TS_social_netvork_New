const Post = require('../../models/Post')
const User = require('../../models/User')


class PostController {
	// create post
	async createPost(req, res) {
		const newPost = new Post(req.body)
		try {
			const savedPost = await newPost.save()
			res.status(200).json(savedPost)
		} catch (e) {
			res.status(500).json(e)
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
			const post = await Post.findById(req.params.id)

			if (post.userId === req.body.userId) {
				await post.deleteOne()
				res.status(200).json('Пост удален')
			} else {
				res.status(403).json('Вы не можете удалять посты других пользователей')
			}
		} catch (e) {
			res.status(500).json(e)
		}
	}

	// llike/dislike post
	async likeDislikePost(req, res) {
		try {
			const post = await Post.findById(req.params.id)

			if (!post.likes.includes(req.body.userId)) {
				await post.updateOne({ $push: { likes: req.body.userId } })
				res.status(200).json('Вы лайкнули пост')
			} else {
				await post.updateOne({ $pull: { likes: req.body.userId } })
				res.status(200).json('Вы дизлайкнули пост')
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
			const currentUser = await User.findById(req.params.userId)
			const userPosts = await Post.find({ userId: current._id })
			const friendPosts = await Promis.all(
				currentUser.followings.map(friendId => {
					return Post.find({ userId: friendId })
				})
			)
			res.status(200).json([...userPosts, ...friendPosts])
		} catch (e) {
			res.status(500).json(e)
		}
	}
	// get user's all posts
	async getProfilePosts(req, res) {
		try {
			const user = await User.findOne({ userName: req.params.userName })
			const posts = await Post.find({ userId: user._id })
			res.status(200).json(posts)
		} catch (e) {
			res.status(500).json(e)
		}
	}
}

module.exports = new PostController()