import { CommentType, PostType } from '../types/post';
import { authInstans } from './api';

export const createPost = async (formData: FormData) => {
	const { data } = await authInstans.post<PostType<string>[]>('api/post', formData);
	return data;
};

export const deletePost = async (id: string) => {
	const response = await authInstans.delete<number>(`api/post/${id}`);
	return response.status;
};

export const likePost = async (_id: string, postId: string) => {
	const { data } = await authInstans
		.put<{ likes: string[], dislikes: string[] }>(`api/post/like/${postId}`, { userId: _id });
	return data;
};

export const dislikePost = async (_id: string, postId: string) => {
	const { data } = await authInstans
		.put<{ likes: string[], dislikes: string[] }>(`api/post/dislike/${postId}`, { userId: _id });
	return data;
};

export const getPost = async (id: string) => {
	const { data } = await authInstans.get<PostType<string>>(`api/post/${id}`);
	return data;
};

export const getTimeLine = async (userId: string) => {
	const { data } = await authInstans.get<PostType<string>[]>(`api/post/timeline/${userId}`);
	return data;
};

export const getProfilePosts = async (userId: string) => {
	const { data } = await authInstans.get<PostType<string>[]>(`api/post/profile/${userId}`);
	return data;
};

// ----------------------------------------------

export const getComments = async (postId: string) => {
	const { data } = await authInstans.get<CommentType[]>(`api/comments/${postId}`);
	return data;
};

export const likeComment = async (_id: string, commentId: string) => {
	const { data } = await authInstans
		.patch<{ likes: string[], dislikes: string[] }>(`api/comments/like/${commentId}`, { userId: _id });
	return data;
};

export const dislikeComment = async (_id: string, commentId: string) => {
	const { data } = await authInstans
		.patch<{ likes: string[], dislikes: string[] }>(`api/comments/dislike/${commentId}`, { userId: _id });
	return data;
};