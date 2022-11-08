import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/profile";

const initialState = {
	users: [] as UserType[]
}

type StateInterfase = typeof initialState

const usersSlice = createSlice({
	name: 'usersSlice',
	initialState,
	reducers: {
		setUsers(state: StateInterfase, action: PayloadAction<UserType[]>) {
			state.users = action.payload
		}
	}
})

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer