import { useAppSelector } from './reactReduxHooks'

export const useAvatar = () => {
	const { avatar } = useAppSelector(store => store.profilePage.defaultUser)
	return `${process.env.REACT_APP_API_URL}${avatar}`
}

export const getPhoto = (img: string) => {
	return `${process.env.REACT_APP_API_URL}${img}`
}