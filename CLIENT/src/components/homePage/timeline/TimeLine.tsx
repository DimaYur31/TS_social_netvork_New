import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { fetchTimeLineThunk } from '../../../store/slices/apiActions/postActions'
import { selectDefaultUser, selectPosts } from '../../../selectors/selectors'
import s from './TimeLine.module.scss'

import Post from '../myPosts/post/Post'

const TimeLine = () => {
	console.log('TimeLine render')
	const dispatch = useAppDispatch()
	const defaultUser = useAppSelector(selectDefaultUser)
	const posts = useAppSelector(selectPosts)

	useEffect(() => {
		dispatch(fetchTimeLineThunk(defaultUser._id))
	}, [])

	return (
		<div className={s.posts}>
			{posts.length
				? <div>{
					posts.map(post => {
						return <Post key={post._id} post={post} />
					})
				}</div>
				: <h2>Your timeline is empty</h2>
			}
		</div>
	)
}

// export default TimeLine
export default React.memo(TimeLine)