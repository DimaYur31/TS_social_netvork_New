import { useAppDispatch, useAppSelector } from './reactReduxHooks'
import { useParams } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { changeDefailtAndCurrentUsers } from '../store/slices/apiActions/usersActions';


export const useAvatar = (img?: string) => {
	const { avatar } = useAppSelector(store => store.profilePage.renderUser)
	if (img) {
		return `${process.env.REACT_APP_API_URL}${img}`
	} else {
		return `${process.env.REACT_APP_API_URL}${avatar}`

	}
}

export const getPhoto = (img: string) => {
	return `${process.env.REACT_APP_API_URL}${img}`
}
//hook берет id из адресной строки и задает в state данные юзера которые нужно отрисовывать на данной странице
export const useRenderUser = () => {
	const dispatch = useAppDispatch()
	const { defaultUser } = useAppSelector(state => state.profilePage)
	const params = useParams()

	useLayoutEffect(() => {
		dispatch(changeDefailtAndCurrentUsers(defaultUser, params._id))
	}, [params._id])
}

export const useIsOwner = () => {
	const { defaultUser, renderUser } = useAppSelector(state => state.profilePage)
	if (defaultUser._id === renderUser._id) {
		return true
	} else {
		return false
	}

}