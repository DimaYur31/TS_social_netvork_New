import { authInstans, instans } from './api'

export const userRegistration = async (email, password, name, surname) => {
	try {
		const { data } = await instans.post('api/auth/registration', { email: email, password, name, surname })
		localStorage.setItem('token', data.token)
		return (data.user)
	} catch (e) {
		console.log(e)
	}
}

export const userLogin = async (email, password) => {
	try {
		const { data } = await instans.post('api/auth/login', { email, password })
		localStorage.setItem('token', data.token)
		return (data.user)
	} catch (e) {
		console.log(e)
	}
}

export const check = async () => {
	try {
		const { data } = await authInstans.get('api/auth/check')

		localStorage.setItem('token', data.token)
		return (data.user)
	} catch (e) {
		localStorage.removeItem('token')
	}
}