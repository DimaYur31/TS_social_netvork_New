import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { fetchPostsThunk } from '../../../store/slices/apiActions/postActions'
import { selectPosts, selectRenderUserId } from '../../../selectors/selectors'
import s from './MyPosts.module.scss'

import Post from './post/Post'

const MyPosts = () => {
	const dispatch = useAppDispatch()
	const _id = useAppSelector(selectRenderUserId)
	const posts = useAppSelector(selectPosts)

	useEffect(() => {
		dispatch(fetchPostsThunk(_id))
	}, [_id])

	console.log('MyPosts render')
	return (
		<div className={s.posts}>
			{posts.length
				? <div>{
					posts.map(post => {
						return <Post key={post._id} post={post} />
					})
				}</div>
				: <h2>Add Your Posts</h2>
			}
		</div>
	)
}

export default React.memo(MyPosts)