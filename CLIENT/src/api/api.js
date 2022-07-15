import axios from 'axios'

const instans = axios.create({ baseURL: process.env.REACT_APP_API_URL })

const authInstans = axios.create({ baseURL: process.env.REACT_APP_API_URL })

const authIntercepter = config => {
	config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
	return config
}

authInstans.interceptors.request.use(authIntercepter)

export { instans, authInstans }