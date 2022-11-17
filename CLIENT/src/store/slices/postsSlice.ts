
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PostType, PostsTypeState } from '../../types/post'

const initialState = {
	posts: [] as Array<PostType<string>>
}

interface likePayload {
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
				let dateOne = new Date(`${a.updatedAt}`)
				let dateTwo = new Date(`${b.updatedAt}`)
				return dateTwo.getTime() - dateOne.getTime()
			})
			state.posts = sortedPost
		},

		likeDislike(state: PostsTypeState, action: PayloadAction<likePayload>) {
			state.posts.forEach((post: PostType<string>, item, posts) => {
				if (posts[item]._id === action.payload.postId) {
					posts[item].likes = action.payload.likes
					posts[item].dislikes = action.payload.dislikes
				}
			})
		},

		removePost(state: PostsTypeState, action: PayloadAction<string>) {
			state.posts = state.posts.filter(post => post._id !== action.payload)
		}
	}
})

export const { setPosts, likeDislike, removePost } = postsSlice.actions
export default postsSlice.reducer