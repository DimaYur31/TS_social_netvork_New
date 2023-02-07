import { ChangeEvent, memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reactReduxHooks';
import { createPostThunk } from '../../../../store/slices/apiActions/postActions';
import { selectDefaultUserId } from '../../../../selectors/selectors';
import { Button } from '../../../styleedComponents/Button';
import style from './AddPost.module.scss';

type AddPostProps = {
	onClose: () => void
}

export const AddPost = memo(({ onClose }: AddPostProps) => {
	const dispatch = useAppDispatch();
	const _id = useAppSelector(selectDefaultUserId);
	const [text, setText] = useState('');
	const [img, setImg] = useState<Blob>();

	const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImg(e.target.files[0]);
		}
	};

	const createPost = () => {
		if (text && img) {
			dispatch(createPostThunk(_id, text, img));
			onClose();
		}
	};

	return (
		<div className={style.wrapper}>
			<textarea
				onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
					setText(e.target.value.trim());
				}}
			/>
			<label htmlFor='post-photo'>
				<span>Выбрать фото</span>
				<input
					id='post-photo'
					onChange={selectFile}
					type='file'
					accept='image/*,.png,.jpg,.gif,.web'
				/>
			</label>
			<Button onClick={createPost}>Send</Button>
		</div>
	);
});