import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AppSliceState = {
	isLoading: boolean
}

const initialState: AppSliceState = {
	isLoading: false
}

const appSlice = createSlice({
	name: 'appSlice',
	initialState,
	reducers: {
		toggleLoading(state: AppSliceState, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		}
	}
})

export const { reducer: appReducer, actions: appActions } = appSlice