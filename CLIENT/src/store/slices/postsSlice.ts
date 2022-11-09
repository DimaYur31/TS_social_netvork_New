
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PostType, PostsTypeState } from '../../types/post'

const initialState = {
	posts: [] as Array<PostType<string>>
}

interface likePayload {
	postId: string,
	likes: string[]
}

const postsSlice = createSlice({
	name: 'postSlice',
	initialState,
	reducers: {
		setPosts(state: PostsTypeState, action: PayloadAction<PostType<string>[]>) {
			state.posts = action.payload
		},

		likeDislike(state: PostsTypeState, action: PayloadAction<likePayload>) {
			state.posts.forEach((post: PostType<string>, item, posts) => {
				if (posts[item]._id === action.payload.postId) {
					post.likes = action.payload.likes
				}
			})
		},

		removePost(state: PostsTypeState, action: PayloadAction<string>) {
			state.posts = state.posts.filter(post => post._id !== action.payload)
		}
		// addPhoto(state: ProfileType, action: PayloadAction<string>) {
		// state.defaultUser.photos.push(action.payload)
		// }

	}
})

export const { setPosts, likeDislike, removePost } = postsSlice.actions
export default postsSlice.reducer