import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store/store';

const sortDate = (a: Date, b: Date) => {
	const dateA = new Date(a);
	const dateB = new Date(b);

	if (dateA.getTime() > dateB.getTime()) {
		return -1;
	} else if (dateA.getTime() < dateB.getTime()) {
		return 1;
	} else {
		return 0;
	}
};


export const selectProfileState = (state: RootState) => state.profilePage;
export const selectIsAuth = (state: RootState) => state.profilePage.isAuth;

export const selectDefaultUser = (state: RootState) => state.profilePage.defaultUser;
export const selectDefaultUserId = (state: RootState) => state.profilePage.defaultUser._id;
export const selectDefaultUserName = (state: RootState) => state.profilePage.defaultUser.name;
export const selectDefaultUserAvatar = (state: RootState) => state.profilePage.defaultUser.avatar;
export const selectDefaultCoverPicture = (state: RootState) => state.profilePage.defaultUser.coverPicture;

export const selectPosts = (state: RootState) => state.postPage.posts;
export const searchText = (state: RootState) => state.app.searchText;
export const selectOnlineUsers = (state: RootState) => state.app.onlineUsers;

export const sortedPosts = createSelector(
	[selectPosts],
	(posts) => {
		const sort = [...posts];
		sort.sort((a, b) => sortDate(a.createdAt, b.createdAt));
		return sort;
	}
);

export const filterPosat = createSelector(
	[sortedPosts, searchText],
	(sortedPosts, searchText) => {
		const filterSortedPosat = sortedPosts.filter((post) => {
			return post.text.toLowerCase().includes(searchText.toLowerCase());
		});

		return filterSortedPosat;
	}
);

export const selectUsers = (state: RootState) => state.usersPage.users;
export const selectFriends = (state: RootState) => state.usersPage.friends;

export const selectChats = (state: RootState) => state.messenger.chats;
export const selectCurrentChat = (state: RootState) => state.messenger.currentChat;
export const selectMessages = (state: RootState) => state.messenger.messages;


export const usersFilter = createSelector(
	[selectUsers, searchText],
	(selectUsers, searchText) => {
		const usersFilter = selectUsers.filter((user) => {
			return user.name.toLowerCase().includes(searchText.toLowerCase());
		});

		return usersFilter;
	}
);