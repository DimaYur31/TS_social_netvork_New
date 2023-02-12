import { memo, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks';
import { fetchTimeLineThunk } from '../../../store/slices/apiActions/postActions';
import { selectDefaultUserId, sortedPosts } from '../../../selectors/selectors';
import { Post } from '../myPosts/post/Post';
import style from './TimeLine.module.scss';

export const TimeLine = memo(() => {
	const dispatch = useAppDispatch();
	const _id = useAppSelector(selectDefaultUserId);
	const posts = useAppSelector(sortedPosts);

	useEffect(() => {
		dispatch(fetchTimeLineThunk(_id));
	}, []);

	const timeline = useCallback(() => {
		if (!posts.length) return;

		return posts.map(post => {
			return <Post key={post._id} post={post} />;
		});
	}, [posts]);

	return (
		<div className={style.posts}>
			<div>{timeline()}</div>
		</div>
	);
});