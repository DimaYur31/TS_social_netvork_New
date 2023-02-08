import { memo } from 'react';
import { useAppDispatch } from '../../hooks/reactReduxHooks';
import { changeUserProfile, deletePhotoThunk } from '../../store/slices/apiActions/userActions';
import { usePhotosPath } from '../../hooks/hooks';
import { SVG } from '../../img/icons/exportIcons';
import style from './Photo.module.scss';

type TPprops = {
	photo: string
	userId: string
}

export const Photo = memo(({ userId, photo }: TPprops) => {
	const dispatch = useAppDispatch();

	const delPhoto = (id: string, photo: string) => {
		dispatch(deletePhotoThunk(id, photo));
	};

	const setAvatar = (photo: string) => {
		dispatch(changeUserProfile(userId, { avatar: photo }));
	};

	return (
		<div className={style.photo}>
			<img src={usePhotosPath(photo)} alt='avatar' />

			<div className={style.buttons} >
				<button
					onClick={() => delPhoto(userId, photo)}>
					<SVG.Dustbin className={style.button} />
				</button>
				<button onClick={() => setAvatar(photo)}>
					<SVG.More className={`${style.button} ${style.more}`} />
				</button>
			</div>
		</div>
	);
});