import { deletePost, dislikePost, getProfilePosts, getTimeLine, likePost } from '../../../api/postAPI';
import { AppDispatch } from '../../store';
import { appActions } from '../appSlice';
import { postsActions } from '../postsSlice';
import { profileActionst } from '../profileSlice';
import { createPost } from '../../../api/postAPI';
import { uploadPhoto } from '../../../api/userApi';


export const createPostThunk = (_id: string, text: string, img: Blob,) => {
	return async (dispatch: AppDispatch) => {
		dispatch(appActions.toggleLoading(true));

		const photoFormData = new FormData();
		photoFormData.append('userId', _id);
		photoFormData.append('img', img);
		const image = await uploadPhoto(_id, photoFormData);

		const formData = new FormData();
		formData.append('userId', _id);
		formData.append('text', text);
		formData.append('img', image);

		const posts = await createPost(formData);

		dispatch(profileActionst.addPhoto(image));
		dispatch(postsActions.setPosts(posts));

		dispatch(appActions.toggleLoading(false));
	};
};

export const fetchPostsThunk = (userId: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(appActions.toggleLoading(true));
		const posts = await getProfilePosts(userId);
		dispatch(postsActions.setPosts(posts));
		dispatch(appActions.toggleLoading(false));
	};
};

export const fetchTimeLineThunk = (userId: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(appActions.toggleLoading(true));
		const timeLine = await getTimeLine(userId);
		dispatch(postsActions.setPosts(timeLine));
		dispatch(appActions.toggleLoading(false));
	};
};

export const postLikeThunk = (_id: string, postId: string) => {
	return async (dispatch: AppDispatch) => {
		const { likes, dislikes } = await likePost(_id, postId);
		if (likes && dislikes) {
			dispatch(postsActions.likeDislike({ postId, likes, dislikes }));
		}
	};
};

export const postDislikeThunk = (_id: string, postId: string) => {
	return async (dispatch: AppDispatch) => {
		const { likes, dislikes } = await dislikePost(_id, postId);
		if (likes && dislikes) {
			dispatch(postsActions.likeDislike({ postId, likes, dislikes }));
		}
	};
};

export const deletePostThunk = (id: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(appActions.toggleLoading(true));
		const status = await deletePost(id);

		if (status === 200) {
			dispatch(postsActions.removePost(id));
		}

		dispatch(appActions.toggleLoading(true));
	};
};