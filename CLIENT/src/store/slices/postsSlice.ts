import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostType, PostsTypeState } from '../../types/post';

const initialState = {
	posts: [] as Array<PostType<string>>
};

interface LikeDislikePayload {
	postId: string,
	likes: string[],
	dislikes: string[],
}

const postsSlice = createSlice({
	name: 'postSlice',
	initialState,
	reducers: {
		setPosts(state: PostsTypeState, action: PayloadAction<PostType<string>[]>) {
			const sortedPost = action.payload.sort((a, b) => {
				const dateOne = new Date(`${a.updatedAt}`);
				const dateTwo = new Date(`${b.updatedAt}`);
				return dateTwo.getTime() - dateOne.getTime();
			});
			state.posts = sortedPost;
		},

		likeDislike(state: PostsTypeState, action: PayloadAction<LikeDislikePayload>) {
			state.posts.forEach((post) => {
				if (post._id === action.payload.postId) {
					post.likes = action.payload.likes;
					post.dislikes = action.payload.dislikes;
				}
			});
		},

		removePost(state: PostsTypeState, action: PayloadAction<string>) {
			state.posts = state.posts.filter(post => post._id !== action.payload);
		}
	}
});

export const { reducer: postsReducer, actions: postsActions } = postsSlice;