function cors(req, res, next) {
	// res.header('Access-Control-Allow-Origin', '*')
	// res.header('Access-Control-Allow-Methods', 'GET, PUT, PATHC, POST, DELETE')
	// res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')


	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', '*')
	res.header('Access-Control-Allow-Headers', '*')
	next()
}

module.exports = cors