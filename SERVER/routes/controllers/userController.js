const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const path = require('path')
const User = require('../../models/User')

class UserController {

	async update(req, res) {
		const { userId, isAdmin, password } = req.body
		if (userId === req.params.id || isAdmin) {
			if (password) {
				try {
					const salt = await bcrypt.genSalt(10)
					req.body.password = await bcrypt.hash(password, salt)
				} catch (e) {
					return res.status(500).json(e)
				}
			}
			// console.log(req.files)
			// res.status(200).json(req.body)
			// if (req.files) {
			// 	try {
			// 		const { avatar } = req.files
			// 		let fileName = uuid.v4() + '.jpg'
			// 		avatar.mv(path.resolve(__dirname, '..', '..', 'static', fileName))
			// 		req.body.avatar = fileName
			// 	} catch (e) {
			// 		console.log(e)
			// 	}
			// }

			try {
				const user = await User.findByIdAndUpdate(req.params.id, {
					$set: req.body
				})
				res.status(200).json(user)
			} catch (e) {
				return res.status(500).json(e)
			}

		} else {
			return res.status(403).json('Вы можете редактировать только свой профиль!')
		}
	}

	async delete(req, res) {
		const { userId, isAdmin } = req.body

		if (userId === req.params.id || isAdmin) {
			try {
				await User.findByIdAndDelete(req.params.id)
				res.status(200).json('Аккаунт удален')
			} catch (e) {
				return res.status(500).json(err)
			}
		} else {
			return res.status(403).json('Вы можете удалить только свой аккаунт!')
		}
	}
	// get a user
	async getUser(req, res) {
		const userId = req.query.userId
		const name = req.query.name
		try {
			const user = userId
				? await User.findById(req.params.id)
				: await User.findOne({ name })
			const { password, updatedAt, ...other } = user._doc
			res.status(200).json(other)
		} catch (e) {
			res.status(500).json(e)
		}
	}

	async getFriends(req, res) {
		try {
			const user = User.findById(req.params.id)
			const friends = await Promise.all(
				user.followings.map(friendId => {
					return User.findById(friendId)
				})
			)
			let friendList = []
			friends.map(friend => {
				const { _id, name, profilePicture } = friend
				friendList.posh({ _id, name, profilePicture })
			})
		} catch (e) {
			res.status(500).json(e)
		}
	}
	// folllow a user
	async follow(req, res) {
		const { userId } = req.body
		if (userId !== req.params.id) {
			try {
				const user = await User.findById(req.params.id)
				const currentUser = await User.findById(userId)

				if (!user.followers.includes(userId)) {
					await user.updateOne({ $push: { followers: userId } })
					await currentUser.updateOne({ $push: { followings: req.param.id } })
					res.status(200).json('Вы подписались')
				} else {
					res.status(403).json('Вы уже подписаны на данного пользователя')
				}
			} catch (e) {
				res.status(500).json(e)
			}
		} else {
			res.status(500).json('Вы не можете подписаться на себя')
		}
	}
	// unfollow a user
	async unfollow(req, res) {
		const { userId } = req.body.id
		if (userId !== req.params.id) {
			try {
				const user = await User.findById(req.params.id)
				const currentUser = await User.findById(userId)

				if (user.followers.includes(userId)) {
					await user.updateOne({ $pull: { followers: userId } })
					await currentUser.updateOne({ $pull: { followings: req.params.id } })
					res.status(200).json('Вы отписались от данного пользователя')
				} else {
					res.status(403).json('Вы не подписвнны на данного пользователя')
				}
			} catch (e) {
				res.status(403).json(e)
			}
		} else {
			res.status(500).json('Вы не можете отписаться от себя')
		}
	}

	async addPhoto(req, res) {
		if (req.body.userId === req.params.id) {
			try {
				const { img } = req.files
				let fileName = uuid.v4() + '.jpg'

				img.mv(path.resolve(__dirname, '..', '..', 'static', fileName))

				const user = await User.findById(req.params.id)

				await user.updateOne({ $push: { photos: fileName } })
				res.status(200).json(user.photos)
			} catch (e) {
				res.status(400).json(e)
			}
		} else {
			res.status(400).json('Вы может обновлять фото только в своем профиле')
		}
	}

	async deletePhoto(req, res) {
		try {
			if (req.params.id === req.body.userId) {
				const user = await User.findById(req.params.id)
				console.log(user)

				await user.photos.deleteOne({ value: req.body.photo })
				res.status(200).json(user.photos)
			} else {
				res.status(400).json('Вы можете удалить только свои фото')
			}
		} catch (e) {
			res.status(400).json(e)
		}
	}
}

module.exports = new UserController()