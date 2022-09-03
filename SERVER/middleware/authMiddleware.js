const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next()
	}

	try {
		const token = req.headers.authorization.split(' ')[1]

		if (!token) {
			return res.status(401).json('Не авторизован')
		}

		const decodet = jwt.verify(token, process.env.SECRET_KEY)

		req.body.user = decodet
		next()
	} catch (e) {
		res.status(401).json('Ошибка авторизации')
	}
}