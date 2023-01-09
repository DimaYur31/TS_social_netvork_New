import React, { useEffect, FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { fetchPostsThunk } from '../../../store/slices/apiActions/postActions'
import { selectPosts } from '../../../selectors/selectors'
import s from './MyPosts.module.scss'

import Post from './post/Post'

const MyPosts: FC<{ _id: string }> = ({ _id }) => {
	const dispatch = useAppDispatch()
	const posts = useAppSelector(selectPosts)

	useEffect(() => {
		dispatch(fetchPostsThunk(_id))
	}, [_id])

	console.log('MyPosts render')
	return (
		<div className={s.posts}>
			{posts!.length
				? <div>{
					posts.map(post => {
						return <Post key={post._id} post={post} />
					})
				}</div>
				// : <h2>Add Your Posts</h2>
				: null
			}
		</div>
	)
}

export default React.memo(MyPosts)