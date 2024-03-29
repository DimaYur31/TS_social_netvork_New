import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType, UserType } from '../../types/profile';

const initialState: ProfileType = {
	defaultUser: {} as UserType,
	isAuth: false
};

const profileSlice = createSlice({
	name: 'profileSlice',
	initialState,
	reducers: {
		setUser(state: ProfileType, action: PayloadAction<UserType>) {
			state.defaultUser = action.payload;
			state.isAuth = true;
		},

		addPhoto(state: ProfileType, action: PayloadAction<string>) {
			state.defaultUser.photos.push(action.payload);
		},

		userExit(state: ProfileType) {
			localStorage.removeItem('token');
			state = initialState;
		},

		removePhoto(state: ProfileType, action: PayloadAction<string>) {
			state.defaultUser.photos = state.defaultUser.photos.filter((photo) => photo !== action.payload);
		},

		follow(state: ProfileType, action: PayloadAction<string[]>) {
			state.defaultUser.followings = action.payload;
		},

		unfollow(state: ProfileType, action: PayloadAction<string[]>) {
			state.defaultUser.followings = action.payload;
		}
	}
});

export const { reducer: profileReducer, actions: profileActionst } = profileSlice;