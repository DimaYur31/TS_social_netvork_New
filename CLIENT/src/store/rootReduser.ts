import { combineReducers } from '@reduxjs/toolkit'

import { profileReducer } from './slices/profileSlice'
import { postsReducer } from './slices/postsSlice'
import { appReducer } from './slices/appSlice'
import { usersReducer } from './slices/usersSlice'
import { chatReducer } from './slices/chatSlice'

export const rootReducer = combineReducers({
	profilePage: profileReducer,
	app: appReducer,
	postPage: postsReducer,
	usersPage: usersReducer,
	messenger: chatReducer
})