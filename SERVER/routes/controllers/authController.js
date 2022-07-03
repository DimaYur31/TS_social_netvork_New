const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const generateJwt = (id, email) => {
	return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class AuthController {

	async registration(req, res) {
		const { email, password, name, surname } = req.body

		if (!email || !password) {
			return res.status(200).json({ message: 'Не верный Email и Password' })
		}

		const newUser = await User.findOne({ email })

		if (newUser) {
			return res.status(200).json({ message: 'Пользователь с таким Email уже существует' })
		}

		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({ email, password: hashPassword, name, surname })
		const token = generateJwt(user.id, user.email)
		return res.json({ token, user })
	}

	async login(req, res) {
		const { email, password } = req.body

		const user = await User.findOne({ email })

		if (!user) {
			return res.status(200).json({ message: 'Пользователь не найден' })
		}

		let comparePassword = bcrypt.compareSync(password, user.password)

		if (!comparePassword) {
			return res.status(200).json({ message: 'Не верный пароль' })
		}

		const token = generateJwt(user.id, user.email)
		return res.json({ token, user })
	}

	async check(req, res) {
		const user = await User.findOne({ _id: req.body.user.id })
		const token = generateJwt(user._id, user.email)
		return res.json({ token, user })
	}
}

module.exports = new AuthController() 