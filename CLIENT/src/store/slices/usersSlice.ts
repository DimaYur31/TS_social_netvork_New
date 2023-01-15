import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UsersType, UserType } from '../../types/profile'

const initialState = {
	users: [] as UserType[],
	friends: [] as UsersType[]
}

type StateInterfase = typeof initialState

const usersSlice = createSlice({
	name: 'usersSlice',
	initialState,
	reducers: {
		setUsers(state: StateInterfase, action: PayloadAction<UserType[]>) {
			state.users = action.payload
		},
		setFriends(state: StateInterfase, action: PayloadAction<UsersType[]>) {
			state.friends = action.payload
		}
	}
})

export const { setUsers, setFriends } = usersSlice.actions
export default usersSlice.reducer