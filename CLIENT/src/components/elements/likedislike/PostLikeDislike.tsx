import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks';
import { selectDefaultUserId } from '../../../selectors/selectors';
import { postDislikeThunk, postLikeThunk } from '../../../store/slices/apiActions/postActions';
import { SVG } from '../../../img/icons/exportIcons';
import style from './likeDislike.module.scss';

type LikeDislikeProps = {
	likes: string[]
	dislikes: string[]
	currentObjectId: string
	currentObjectUserId: string
}

export const PostLikeDislike = (props: LikeDislikeProps) => {

	const dispatch = useAppDispatch();
	const _id = useAppSelector(selectDefaultUserId);
	const { likes, dislikes, currentObjectId, currentObjectUserId } = props;
	const [isLiked, setIsLiked] = useState(likes.includes(_id));
	const [isDisliked, setIsDisliked] = useState(dislikes.includes(_id));

	const hendelLikes = () => {
		if (_id !== currentObjectUserId) {
			dispatch(postLikeThunk(_id, currentObjectId));
			setIsLiked(!isLiked);
			setIsDisliked(false);
		}
	};

	const hendelDislikes = () => {
		if (_id !== currentObjectUserId) {
			dispatch(postDislikeThunk(_id, currentObjectId));
			setIsDisliked(!isDisliked);
			setIsLiked(false);
		}
	};

	return (
		<div className={style.statistic}>
			<span
				className={isLiked ? `${style.active}` : ''}
				onClick={() => hendelLikes()}
			>
				<SVG.Like className={style.like} />
			</span>
			<p>
				{`${likes.length}`}
			</p>
			<span
				className={isDisliked ? `${style.active}` : ''}
				onClick={() => hendelDislikes()}
			>
				<SVG.Dislike className={style.dislike} />
			</span>
			<p>
				{`${dislikes.length}`}
			</p>
		</div>
	);
};