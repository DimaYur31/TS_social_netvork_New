import { memo, useCallback } from 'react';
import { CommentType } from '../../../types/post';
import { InputPanel } from '../../elements/inputPanel/InputPanel';
import { useGetPageData } from '../../../hooks/useGetPageData';
import { getComments } from '../../../api/postAPI';
import { Comment } from './comment/Comment';

type UseGetPageData = {
	data: CommentType[]
	renderId: string
	reload: () => void
}

export const Comments = memo(function Comments() {

	const { data: comments, renderId, reload }: UseGetPageData = useGetPageData(2, getComments);

	const fetchComments = useCallback(() => reload(), []);

	return (
		<div>
			<InputPanel postId={renderId} reload={fetchComments} />
			{
				comments && comments.map((comment) => {
					return (
						<Comment
							key={comment._id}
							comment={comment}
							reload={fetchComments}
						/>
					);
				})
			}
		</div>
	);
});