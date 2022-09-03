import { useAppSelector } from './reactReduxHooks'

export const useAvatar = (img?: string) => {
	const { avatar } = useAppSelector(store => store.profilePage.defaultUser)
	if (img) {
		return `${process.env.REACT_APP_API_URL}${img}`
	}
	return `${process.env.REACT_APP_API_URL}${avatar}`
}

export const getPhoto = (img: string) => {
	return `${process.env.REACT_APP_API_URL}${img}`
}