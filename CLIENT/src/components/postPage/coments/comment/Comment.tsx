import { useLayoutEffect, useState } from 'react';
import { format } from 'timeago.js';
import { usePhotosPath, useIsOwner } from '../../../../hooks/hooks';
import { CommentType } from '../../../../types/post';
import { deleteComment } from '../../../../api/postAPI';
import { CommentLikeDislike } from '../../../elements/likedislike/CommentLikeDislike';
import { SmalAvatar } from '../../../styleedComponents/SmalAvatar';
import { getUserData } from '../../../../api/userApi';
import { UserType } from '../../../../types/profile';
import { SVG } from '../../../../img/icons/exportIcons';
import style from './comment.module.scss';

type CommentProps = {
	comment: CommentType
	reload: () => void
}

export const Comment = ({ comment, reload }: CommentProps) => {

	const [commentator, setCommentator] = useState<UserType | null>(null);
	const { commentatorId, dislikes, likes, text, _id, createdAt } = comment;
	const isOwner = useIsOwner(commentatorId);

	const fetchUser = async () => {
		const user = await getUserData(commentatorId);
		setCommentator(user);
	};

	useLayoutEffect(() => {
		fetchUser();
	}, []);

	const removeComment = async () => {
		const status = await deleteComment(_id);

		if (status === 200) {
			reload();
		}
	};

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

			{isOwner &&
				<span className={style.delete} >
					<SVG.Cancel onClick={() => removeComment()} />
				</span>
			}
		</div>
	);
};