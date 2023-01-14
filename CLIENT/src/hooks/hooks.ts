import { useAppSelector } from './reactReduxHooks'

// import { changeDefaultAndCurrentUsers } from '../store/slices/apiActions/usersActions'
import { selectDefaultUserAvatar, selectDefaultUserId } from './../selectors/selectors'

// если передана картинка возвращает полный путь к ней, !isDB передавать если ссылка для др сайтов , если нет img то путь к аватару пользователся
export const usePhotosPath = (img?: string, isDB = true) => {
	const avatar: string = useAppSelector(selectDefaultUserAvatar)
	if (!img) return `${process.env.REACT_APP_API_URL}${avatar}`
	if (!isDB) return img
	return `${process.env.REACT_APP_API_URL}${img}`
}

// проверяет является ли пользыватель автором контетна
export const useIsOwner = (id: string) => {
	const _id = useAppSelector(selectDefaultUserId)
	if (_id === id) {
		return true
	} else {
		return false
	}
}