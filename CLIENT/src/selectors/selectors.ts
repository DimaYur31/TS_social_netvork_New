import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

const sortDate = (a: Date, b: Date) => {
	let dateA = new Date(a)
	let dateB = new Date(b)

	if (dateA.getTime() > dateB.getTime()) {
		return -1
	} else if (dateA.getTime() < dateB.getTime()) {
		return 1
	} else {
		return 0
	}
}


export const selectProfileState = (state: RootState) => state.profilePage
export const selectIsAuth = (state: RootState) => state.profilePage.isAuth

export const selectDefaultUser = (state: RootState) => state.profilePage.defaultUser
export const selectDefaultUserId = (state: RootState) => state.profilePage.defaultUser._id
export const selectDefaultUserName = (state: RootState) => state.profilePage.defaultUser.name
export const selectDefaultUserAvatar = (state: RootState) => state.profilePage.defaultUser.avatar

export const selectPosts = (state: RootState) => state.postPage.posts
export const sortedPosts = createSelector(
	[selectPosts],
	(posts) => {
		let sort = [...posts]
		sort.sort((a, b) => sortDate(a.createdAt, b.createdAt))
		console.log(sort)
		return sort
	}
)

export const selectUsers = (state: RootState) => state.usersPage.users
export const selectFriends = (state: RootState) => state.usersPage.friends

export const selectChats = (state: RootState) => state.messenger.chats
export const selectCurrentChat = (state: RootState) => state.messenger.currentChat
export const selectMessages = (state: RootState) => state.messenger.messages