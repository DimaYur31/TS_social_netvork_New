import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Tstate = {
	isLoading: boolean
}

const initialState: Tstate = {
	isLoading: false
}

const appSlice = createSlice({
	name: 'appSlice',
	initialState,
	reducers: {
		toggleLoading(state: Tstate, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		}
	}
})

export const { toggleLoading } = appSlice.actions

export default appSlice.reducer