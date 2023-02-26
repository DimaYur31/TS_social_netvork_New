import { userRegistration, userLogin, check } from '../../../api/authAPI';
import { deletePhoto, followUser, updateUser, uploadPhoto } from '../../../api/userApi';
import { UserChanges } from '../../../types/profile';
import { AppDispatch } from '../../store';
import { appActions } from '../appSlice';
import { profileActionst } from '../profileSlice';

export const registrationThunkCreator = (email: string, password: string, name: string, surname: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(appActions.toggleLoading(true));

		const user = await userRegistration(email, password, name, surname);

		dispatch(profileActionst.setUser(user!));
		dispatch(appActions.toggleLoading(false));
	};
};

export const loginThunkCreator = (email: string, password: string) => {
	return async (dispatch: AppDispatch) => {
		dispatch(appActions.toggleLoading(true));

		const user = await userLogin(email, password);

		dispatch(profileActionst.setUser(user!));
		dispatch(appActions.toggleLoading(false));
	};
};

export const chechAuthUser = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(appActions.toggleLoading(true));

		const user = await check();
		dispatch(profileActionst.setUser(user!));
		dispatch(appActions.toggleLoading(false));
	};
};

export const uploadPhotoThunkCreator = (id: string, formData: FormData) => {
	return async (dispatch: AppDispatch) => {
		const data: string = await uploadPhoto(id, formData);

		dispatch(profileActionst.addPhoto(data));
	};
};

export const deletePhotoThunk = (userId: string, photo: string) => {
	return async (dispatch: AppDispatch) => {
		const status = await deletePhoto(userId, photo);
		status === 204 && dispatch(profileActionst.removePhoto(photo));
	};
};

export const changeUserProfile = (userId: string, changes: UserChanges) => {
	return async (dispatch: AppDispatch) => {
		const user = await updateUser(userId, changes);

		dispatch(profileActionst.setUser(user));
		return user;
	};
};

export const followUnfollowThunk = (userId: string, id: string, isFollow: boolean) => {
	return async (dispatch: AppDispatch) => {
		const data = await followUser(userId, id, isFollow);
		if (!isFollow) {
			dispatch(profileActionst.follow(data));
			return true;
		} else {
			dispatch(profileActionst.unfollow(data));
			return false;
		}
	};
};