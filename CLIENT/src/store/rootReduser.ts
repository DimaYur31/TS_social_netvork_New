import { combineReducers } from '@reduxjs/toolkit'

import profileReducer from './slices/profileSlice'
import postsReducer from './slices/postsSlice'
import applicationReducer from './slices/appSlice'
import usersSlice from './slices/usersSlice'
import chatSlice from './slices/chatSlice'

export const rootReducer = combineReducers({
	profilePage: profileReducer,
	app: applicationReducer,
	postPage: postsReducer,
	usersPage: usersSlice,
	messenger: chatSlice
})

// export type RootReduserType = ReturnType<typeof rootReducer>