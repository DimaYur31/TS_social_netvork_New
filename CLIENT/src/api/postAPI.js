import { authInstans } from './api'

export const createPost = async (formData) => {
	const { data } = await authInstans.post('api/post', formData)
	return data
}

// export const editPost = async (id, userId, changes) => {
// 	const { data } = await authInstans.put(`api/post/${id}`, { userId, changes })
// 	return data
// }

export const deletePost = async (id) => {
	const response = await authInstans.delete(`api/post/${id}`)
	return response.status
}

export const likePost = async (_id, postId) => {
	const { data } = await authInstans.put(`api/post/like/${postId}`, { userId: _id })
	return data
}

export const dislikePost = async (_id, postId) => {
	const { data } = await authInstans.put(`api/post/dislike/${postId}`, { userId: _id })
	return data
}

export const getPost = async (id) => {
	const { data } = await authInstans.get(`api/post/${id}`)
	return data
}

export const getTimeLine = async (userId) => {
	const { data } = await authInstans.get(`api/post/timeline/${userId}`)
	return data
}

export const getProfilePosts = async (userId) => {
	const { data } = await authInstans.get(`api/post/profile/${userId}`)
	return data
}

