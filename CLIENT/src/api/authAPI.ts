import { authInstans, instans } from './api'
import { UserType } from '../types/profile'

type ResponseToken = {
	token: string
	user: UserType
}

export const userRegistration = async (email: string, password: string, name: string, surname: string) => {
	try {
		const { data } = await instans.post<ResponseToken>('api/auth/registration', { email: email, password, name, surname })
		localStorage.setItem('token', data.token)
		return (data.user)
	} catch (e) {
		console.log(e)
	}
}

export const userLogin = async (email: string, password: string) => {
	try {
		const { data } = await instans.post<ResponseToken>('api/auth/login', { email, password })
		localStorage.setItem('token', data.token)
		return (data.user)
	} catch (e) {
		console.log(e)
	}
}

export const check = async () => {
	try {
		const { data } = await authInstans.get<ResponseToken>('api/auth/check')

		localStorage.setItem('token', data.token)
		return (data.user)
	} catch (e) {
		localStorage.removeItem('token')
	}
}