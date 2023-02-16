import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks';
import { uploadPhotoThunkCreator } from '../../store/slices/apiActions/userActions';
import { selectDefaultUser } from '../../selectors/selectors';
import { SVG } from '../../img/icons/exportIcons';
import { Photo } from './Photo';
import style from './Photo.module.scss';

const Photos = () => {
	const dispatch = useAppDispatch();
	const { _id, photos } = useAppSelector(selectDefaultUser);

	const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		const formData = new FormData();
		formData.append('userId', _id);
		formData.append('img', e.target.files[0]);
		dispatch(uploadPhotoThunkCreator(_id, formData));
	};

	return (
		<div className={style.wrapper}>
			<label className={style.addphoto}>
				<input type='file' onChange={selectFile} />
				<SVG.AddImage />
			</label>

			<div className={style.photos}>
				{photos.map((photo: string) => {
					return <Photo key={photo} photo={photo} userId={_id} />;
				})}
			</div>
		</div>
	);
};

export default Photos;