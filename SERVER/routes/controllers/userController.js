const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const path = require('path')
const User = require('../../models/User')
const fs = require('fs')

class UserController {

	async getUserData(req, res) {
		try {
			const user = await User.findById(req.params.id)

			res.status(200).json(user)
		} catch (error) {
			res.status(500).json(error)
		}
		// let currentUser = {}
		// const keys = Object.keys(user._doc)

		// for (let key of keys) {
		// if (key !== 'email' && key !== 'password') {
		// currentUser[key] = user._doc[key]
		// }
		// }
		// console.log(user)
	}

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
			try {
				const user = await User.findByIdAndUpdate(req.params.id, {
					$set: req.body
				},
					{ new: true })
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
		const userId = req.query
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

	async getUsers(req, res) {
		try {
			const userId = req.params.userId
			const users = await User.find({ _id: { $ne: userId } })
			res.status(200).json(users)
		} catch (error) {
			res.status(500).json(error)
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
					await currentUser.updateOne({ $push: { followings: req.params.id } })
					res.status(200).json(currentUser.followings)
				} else {
					res.status(403).json('Вы уже подписаны')
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
		const { userId } = req.body

		if (userId !== req.params.id) {
			try {
				const user = await User.findById(req.params.id)
				const currentUser = await User.findById(userId)

				if (user.followers.includes(userId)) {
					await user.updateOne({ $pull: { followers: userId } })
					await currentUser.updateOne({ $pull: { followings: req.params.id } })
					res.status(200).json(currentUser.followings)
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
				res.status(200).json(fileName)
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

				const user = await User.findOneAndUpdate(
					{ _id: req.params.id },
					{
						$pull: { photos: req.body.photo }
					}
				)
				fs.unlink(path.resolve(__dirname, '..', '..', 'static', req.body.photo), () => { })
				res.status(204).json('ok')
			} else {
				res.status(400).json('Вы можете удалить только свои фото')
			}
		} catch (e) {
			res.status(400).json(e)
		}
	}
}

module.exports = new UserController()