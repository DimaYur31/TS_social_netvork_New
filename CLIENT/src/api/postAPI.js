import { authInstans } from './api'

export const createPost = async (formData) => {
	console.log(formData)
	const { data } = await authInstans.post('api/post', formData)
	return data
}

export const editPost = async (id, userId, changes) => {
	const { data } = await authInstans.put(`api/post/${id}`, { userId, changes })
	return data
}

export const deletePost = async (id, userId) => {
	const response = await authInstans.delete(`api/post/${id}`)
	return response.status
}

export const likePost = async (_id, postId) => {
	const { data } = await authInstans.put(`api/post/like/${postId}`, { userId: _id })
	console.log(data)

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

export const getProfilePosts = async (name) => {
	const { data } = await authInstans.get(`api/post/profile/${name}`)
	return data
}

