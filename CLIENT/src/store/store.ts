import { configureStore } from '@reduxjs/toolkit'
import { messageApi } from './query/messagesApi'
import { rootReducer } from './rootReduser'

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(messageApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch