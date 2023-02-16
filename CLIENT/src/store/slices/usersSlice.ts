import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersType, UserType } from '../../types/profile';

const initialState = {
	users: [] as UserType[],
	friends: [] as UsersType[]
};

type StateType = typeof initialState

const usersSlice = createSlice({
	name: 'usersSlice',
	initialState,
	reducers: {
		setUsers(state: StateType, action: PayloadAction<UserType[]>) {
			state.users = action.payload;
		},
		setFriends(state: StateType, action: PayloadAction<UsersType[]>) {
			state.friends = action.payload;
		}
	}
});

export const { reducer: usersReducer, actions: userActions } = usersSlice;