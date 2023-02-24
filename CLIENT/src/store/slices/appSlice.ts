import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppSliceState = {
	isLoading: boolean
	searchText: string
}

const initialState: AppSliceState = {
	isLoading: false,
	searchText: ''
};

const appSlice = createSlice({
	name: 'appSlice',
	initialState,
	reducers: {
		toggleLoading(state: AppSliceState, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},

		setSearch(state: AppSliceState, action: PayloadAction<string>) {
			state.searchText = action.payload;
		},
	}
});

export const { reducer: appReducer, actions: appActions } = appSlice;