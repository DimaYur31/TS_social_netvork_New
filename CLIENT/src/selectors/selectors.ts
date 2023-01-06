import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

export const selectProfileState = (state: RootState) => state.profilePage

export const selectDefaultUser = (state: RootState) => state.profilePage.defaultUser
export const selectDefaultUserId = (state: RootState) => state.profilePage.defaultUser._id

export const selectRenderUser = (state: RootState) => state.profilePage.defaultUser
export const selectRenderUserId = (state: RootState) => state.profilePage.defaultUser._id


export const selectPosts = (state: RootState) => state.postPage.posts

export const selectUsers = (state: RootState) => state.usersPage.users
export const selectFriends = (state: RootState) => state.usersPage.friends

export const selectChats = (state: RootState) => state.messenger.chats
export const selectCurrentChat = (state: RootState) => state.messenger.currentChat
export const selectMessages = (state: RootState) => state.messenger.messages