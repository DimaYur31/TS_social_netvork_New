import { authInstans } from './api'

export const createPost = async (post) => {
	const { data } = await authInstans.post('/post', { post })
	return data
}

export const editPost = async (id, userId, changes) => {
	const { data } = await authInstans.put(`api/post/${id}`, { userId, changes })
	return data
}

export const deletePost = async (id) => {
	const { data } = await authInstans.delete(`api/post/${id}`)
	return data
}

export const likePost = async (id) => {
	const { data } = await authInstans.put(`api/post/${id}/like`)
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

