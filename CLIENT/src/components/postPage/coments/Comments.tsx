import { memo } from 'react';
import { CommentType } from '../../../types/post';
import { useGetPageData } from '../../../hooks/useGetPageDats';
import { getComments } from '../../../api/postAPI';
import { Comment } from './comment/Comment';

export const Comments = memo(function Comments() {

	const { data: comments }: { data: CommentType[] } = useGetPageData(2, getComments);

	return (
		<div>
			{
				comments && comments.map((comment) => {
					return <Comment comment={comment} />;
				})
			}
		</div>
	);
});