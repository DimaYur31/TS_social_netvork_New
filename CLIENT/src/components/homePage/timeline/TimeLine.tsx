import { memo, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { fetchTimeLineThunk } from '../../../store/slices/apiActions/postActions'
import { selectDefaultUserId, sortedPosts } from '../../../selectors/selectors'

import { Post } from '../myPosts/post/Post'

import s from './TimeLine.module.scss'

export const TimeLine = memo(() => {
	const dispatch = useAppDispatch()
	const _id = useAppSelector(selectDefaultUserId)
	const posts = useAppSelector(sortedPosts)

	useEffect(() => {
		dispatch(fetchTimeLineThunk(_id))
	}, [])

	return (
		<div className={s.posts}>
			{posts.length
				? <div>{
					posts.map(post => {
						return <Post key={post._id} post={post} />
					})
				}</div>
				: <h2>Add post or friends</h2>
			}
		</div>
	)
})