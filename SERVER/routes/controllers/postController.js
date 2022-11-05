const Post = require('../../models/Post')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
// const uuid = require('uuid')
// const path = require('path')
// const fs = require('fs')

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
			res.status(500).json('error Ok')
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

	// llike/dislike post
	async likeDislikePost(req, res) {
		try {
			const post = await Post.findById(req.params.id)
			if (post.userId !== req.body.userId) {
				if (!post.likes.includes(req.body.userId)) {
					await post.updateOne({ $push: { likes: req.body.userId } })
					console.log(post)
					res.status(200).json(post.likes)
				} else {
					await post.updateOne({ $pull: { likes: req.body.userId } })
					console.log(post)
					res.status(200).json(post.likes)
				}
			} else {
				res.status(200).json(post.likes)
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
			const friendPosts = await Promise.all(
				user.followings.map(friendId => {
					// console.log(`hi ${users}`)
					return Post.find({ userId: friendId })
					// return User.find({ userId: friendId })
					// return { post, avatar: user.avatar, name: user.name }
				})
			)
			res.status(200).json(userPosts.concat(...friendPosts))
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