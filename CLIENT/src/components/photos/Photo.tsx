import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks';
import { changeUserProfile, deletePhotoThunk } from '../../store/slices/apiActions/userActions';
import { usePhotosPath } from '../../hooks/hooks';
import { selectDefaultCoverPicture, selectDefaultUserAvatar } from '../../selectors/selectors';
import { SVG } from '../../img/icons/exportIcons';
import style from './Photo.module.scss';

type TPprops = {
	photo: string
	userId: string
}

export const Photo = memo(function Photo({ userId, photo }: TPprops) {
	const dispatch = useAppDispatch();
	const avatar = useAppSelector(selectDefaultUserAvatar);
	const coverPicture = useAppSelector(selectDefaultCoverPicture);

	const delPhoto = (id: string, photo: string) => {
		if (avatar === photo) {
			dispatch(changeUserProfile(userId, { avatar: 'defaultAvatar.png' }));
		}

		if (coverPicture === photo) {
			dispatch(changeUserProfile(userId, { coverPicture: 'defaultCover.png' }));
		}

		dispatch(deletePhotoThunk(id, photo));
	};

	const setAvatar = (photo: string) => {
		dispatch(changeUserProfile(userId, { avatar: photo }));
	};
	const setBackground = (photo: string) => {
		dispatch(changeUserProfile(userId, { coverPicture: photo }));
	};

	return (
		<div className={style.photo}>
			<img src={usePhotosPath(photo)} alt='avatar' />

			<div className={style.buttons} >
				<button onClick={() => delPhoto(userId, photo)}>
					<SVG.Dustbin className={style.button} />
				</button>

				<button onClick={() => setBackground(photo)}>
					<SVG.Background className={style.button} />
				</button>
				<button onClick={() => setAvatar(photo)}>
					<SVG.Change className={`${style.button}`} />
				</button>
			</div>
		</div>
	);
});