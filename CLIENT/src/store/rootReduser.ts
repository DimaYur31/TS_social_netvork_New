import { combineReducers } from '@reduxjs/toolkit'
import profileReducer from './slices/profileSlice'
import applicationReducer from './slices/appSlice'

export const rootReducer = combineReducers({
	profilePage: profileReducer,
	app: applicationReducer
})

// export type RootReduserType = ReturnType<typeof rootReducer>