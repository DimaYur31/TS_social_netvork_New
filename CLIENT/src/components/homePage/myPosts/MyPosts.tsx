import { useEffect, memo } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { fetchPostsThunk } from '../../../store/slices/apiActions/postActions'
import { selectPosts } from '../../../selectors/selectors'

import { Post } from './post/Post'
import s from './MyPosts.module.scss'


export const MyPosts = memo(({ _id }: { _id: string }) => {
	const dispatch = useAppDispatch()
	const posts = useAppSelector(selectPosts)

	useEffect(() => {
		dispatch(fetchPostsThunk(_id))
	}, [_id])

	return (
		<div className={s.posts}>
			{posts!.length
				? <div>{
					posts.map(post => {
						return <Post key={post._id} post={post} />
					})
				}</div>
				: null
			}
		</div>
	)
})