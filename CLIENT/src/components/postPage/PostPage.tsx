import React from 'react';
import { useGetPageData } from '../../hooks/useGetPageData';
import { Post } from '../homePage/myPosts/post/Post';
import { getPost } from '../../api/postAPI';
import { PostType } from '../../types/post';
import { Comments } from './coments/Comments';
import style from './postPage.module.scss';

const PostPage = () => {
	const { data: post }: { data: PostType<string> } = useGetPageData(2, getPost);
	return (
		<>
			{
				post &&
				<div className={style.page}>
					<Post post={post} />
					<Comments />
				</div>
			}
		</>
	);
};

export default React.memo(PostPage);