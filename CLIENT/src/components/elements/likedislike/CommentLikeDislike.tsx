import { useState } from 'react';
import { useAppSelector } from '../../../hooks/reactReduxHooks';
import { dislikeComment, likeComment } from '../../../api/postAPI';
import { selectDefaultUserId } from '../../../selectors/selectors';
import { SVG } from '../../../img/icons/exportIcons';
import style from './likeDislike.module.scss';

type LikeDislikeProps = {
	likes: string[]
	dislikes: string[]
	currentObjectId: string
	currentObjectUserId: string
}

export const CommentLikeDislike = (props: LikeDislikeProps) => {

	const _id = useAppSelector(selectDefaultUserId);
	const { likes, dislikes, currentObjectId, currentObjectUserId } = props;

	const [commentLikes, setCommentLikes] = useState(likes);
	const [commentDislikes, setCommentDislikes] = useState(dislikes);

	const [isLiked, setIsLiked] = useState(commentLikes.includes(_id));
	const [isDisliked, setIsDisliked] = useState(commentDislikes.includes(_id));

	const hendelLikes = async () => {
		if (_id !== currentObjectUserId) {
			const { likes, dislikes } = await likeComment(_id, currentObjectId);
			debugger
			setCommentLikes(likes);
			setCommentDislikes(dislikes);
			setIsLiked(!isLiked);
			setIsDisliked(false);
		}
	};

	const hendelDislikes = async () => {
		if (_id !== currentObjectUserId) {
			const { likes, dislikes } = await dislikeComment(_id, currentObjectId);

			setCommentLikes(likes);
			setCommentDislikes(dislikes);
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
				{`${commentLikes.length}`}
			</p>
			<span
				className={isDisliked ? `${style.active}` : ''}
				onClick={() => hendelDislikes()}
			>
				<SVG.Dislike className={style.dislike} />
			</span>
			<p>
				{`${commentDislikes.length}`}
			</p>
		</div>
	);
};