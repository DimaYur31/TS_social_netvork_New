import { useLayoutEffect, useState } from 'react';
import { format } from 'timeago.js';
import { usePhotosPath } from '../../../../hooks/hooks';
import { CommentType } from '../../../../types/post';
import { CommentLikeDislike } from '../../../elements/likedislike/CommentLikeDislike';
import { SmalAvatar } from '../../../styleedComponents/SmalAvatar';
import { getUserData } from '../../../../api/userApi';
import { UserType } from '../../../../types/profile';
import style from './comment.module.scss';

export const Comment = ({ comment }: { comment: CommentType }) => {
	const { commentatorId, dislikes, likes, text, _id, createdAt } = comment;

	const [commentator, setCommentator] = useState<UserType | null>(null);

	const fetchUser = async () => {
		const user = await getUserData(commentatorId);
		setCommentator(user);
	};

	useLayoutEffect(() => {
		fetchUser();
	}, []);

	return (
		<div className={style.comment} >
			<div className={style.item} >
				<div className={style.user} >
					<SmalAvatar src={usePhotosPath(commentator?.avatar)} />
					<span>{commentator?.name}</span>
					<span>{format(createdAt)}</span>
				</div>
				<p>{text}</p>
			</div>

			<CommentLikeDislike
				likes={likes}
				dislikes={dislikes}
				currentObjectId={_id}
				currentObjectUserId={commentatorId}
			/>
			{/* <span>{createdAt}</span> */}
		</div>
	);
};