import { deletePost, dislikePost, getProfilePosts, getTimeLine, likePost } from '../../../api/postAPI'
import { AppDispatch } from '../../store'
import { toggleLoading } from '../appSlice'
import { likeDislike, removePost, setPosts } from '../postsSlice'
import { addPhoto } from '../profileSlice'
import { createPost } from '../../../api/postAPI'
import { uploadPhoto } from '../../../api/userApi'


export const createPostThunk = (_id: string, text: string, img: Blob,) => {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleLoading(true))

		const photoFormData = new FormData()
		photoFormData.append('userId', _id)
		photoFormData.append('img', img)
		const image = await uploadPhoto(_id, photoFormData)

		const formData = new FormData()
		formData.append('userId', _id)
		formData.append('text', text)
		formData.append('img', image)
		const posts = await createPost(formData)
		dispatch(addPhoto(image))
		dispatch(setPosts(posts))

		dispatch(toggleLoading(false))
	}
}

export const fetchPostsThunk = (userId: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleLoading(true))
		const posts = await getProfilePosts(userId)
		dispatch(setPosts(posts))
		dispatch(toggleLoading(false))
	}
}

export const fetchTimeLineThunk = (userId: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleLoading(true))
		const timeLine = await getTimeLine(userId)
		dispatch(setPosts(timeLine))
		dispatch(toggleLoading(false))
	}
}

export const likeThunk = (_id: string, postId: string) => {
	return async (dispatch: AppDispatch) => {
		const { likes, dislikes } = await likePost(_id, postId)
		if (likes && dislikes) {
			dispatch(likeDislike({ postId, likes, dislikes }))
		}
	}
}

export const dislikeThunk = (_id: string, postId: string) => {
	return async (dispatch: AppDispatch) => {
		const { likes, dislikes } = await dislikePost(_id, postId)
		if (likes && dislikes) {
			dispatch(likeDislike({ postId, likes, dislikes }))
		}
	}
}

export const deletePostThunk = (id: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(toggleLoading(true))
		const status = await deletePost(id)

		if (status === 200) {
			dispatch(removePost(id))
		}
		dispatch(toggleLoading(true))
	}
}