import { userRegistration, userLogin, check } from "../../../api/authAPI"
import { deletePhoto, updateUser, uploadPhoto } from "../../../api/userApi"
import { UserChanges } from "../../../types/profile"
import { AppDispatch } from "../../store"
import { toggleLoading } from "../appSlice"
import { addPhoto, removePhoto, setRenderUser, setUser } from "../profileSlice"


export const registrationThunkCreator = (email: string, password: string, name: string, surname: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleLoading(true))
		const user = await userRegistration(email, password, name, surname)
		dispatch(setUser(user))
		dispatch(setRenderUser(user))
		dispatch(toggleLoading(false))
	}
}

export const loginThunkCreator = (email: string, password: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleLoading(true))
		const user = await userLogin(email, password)
		dispatch(setUser(user))
		dispatch(setRenderUser(user))
		dispatch(toggleLoading(false))
	}
}

export const chechAuthUser = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleLoading(true))
		const user = await check()
		dispatch(setUser(user))
		dispatch(setRenderUser(user))
		dispatch(toggleLoading(false))
	}
}

export const uploadPhotoThunkCreator = (id: string, formData: FormData) => {
	return async (dispatch: AppDispatch) => {
		const data: string = await uploadPhoto(id, formData)
		dispatch(addPhoto(data))
	}
}

export const deletePhotoThunk = (userId: string, photo: string) => {
	return async (dispatch: AppDispatch) => {
		let status = await deletePhoto(userId, photo)
		status === 204 && dispatch(removePhoto(photo))
	}
}

export const changeUserProfile = (userId: string, changes: UserChanges) => {
	return async (dispatch: AppDispatch) => {
		// console.log(changes)

		let user = await updateUser(userId, changes)
		dispatch(setUser(user))
	}
}