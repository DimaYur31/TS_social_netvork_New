import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProfileType, UserType } from '../../types/profile'

const initialState: ProfileType = {
	defaultUser: {} as UserType,
	currentUser: {} as UserType,
	renderUser: {} as UserType,
	isAuth: false
}

const profileSlice = createSlice({
	name: 'profileSlice',
	initialState,
	reducers: {
		setUser(state: ProfileType, action: PayloadAction<UserType>) {
			state.defaultUser = action.payload
			state.isAuth = true
		},
		setCurrentUser(state: ProfileType, action: PayloadAction<UserType>) {
			state.currentUser = action.payload
		},
		clearCurrentUser(state: ProfileType, action: PayloadAction) {
			state.currentUser = {} as UserType
		},
		setRenderUser(state: ProfileType, action: PayloadAction<UserType>) {
			state.renderUser = action.payload
		},
		addPhoto(state: ProfileType, action: PayloadAction<string>) {
			state.defaultUser.photos.push(action.payload)
		},
		userExit(state: ProfileType) {
			localStorage.removeItem('token')
			state = initialState
		},
		removePhoto(state: ProfileType, action: PayloadAction<string>) {
			state.defaultUser.photos = state.defaultUser.photos.filter((photo) => photo !== action.payload)
		}
	}
})

export const {
	setUser, addPhoto, userExit, removePhoto,
	setCurrentUser, clearCurrentUser, setRenderUser
} = profileSlice.actions

export default profileSlice.reducer