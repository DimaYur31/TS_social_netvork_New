import { useState } from 'react';
import { PostType } from '../../../../types/post';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reactReduxHooks';
import { deletePostThunk } from '../../../../store/slices/apiActions/postActions';
import { selectDefaultUserId } from '../../../../selectors/selectors';
import { SVG } from '../../../../img/icons/exportIcons';
import style from './ButtonsPopap.module.scss';

export const ButtonsPopap = ({ post }: { post: PostType<string> }) => {
	const _id = useAppSelector(selectDefaultUserId);
	const dispatch = useAppDispatch();
	const [isOpend, setIsOpen] = useState(false);

	const handlePopap = () => {
		setIsOpen(!isOpend);
	};

	const deletePost = () => {
		if (post.userId === _id) dispatch(deletePostThunk(post._id));
	};

	return (
		<div className={style.wrapper}>
			<span onClick={handlePopap}><SVG.More /></span>
			{isOpend &&
				<div className={style.buttons}>
					<span onClick={() => deletePost()}><SVG.Dustbin /></span>
				</div>
			}
		</div>
	);
};