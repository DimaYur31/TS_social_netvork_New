import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { fetchTimeLineThunk } from '../../../store/slices/apiActions/postActions'
import { PostType } from '../../../types/post'
import Post from '../myPosts/post/Post'


type PropsType = {
	allPosts?: PostType<string>[]
}

const TimeLine: FC<PropsType> = () => {
	const dispatch = useAppDispatch()
	const { _id } = useAppSelector(store => store.profilePage.defaultUser)
	const { posts } = useAppSelector(store => store.postPage)

	useEffect(() => {
		dispatch(fetchTimeLineThunk(_id))
	}, [_id])

	return (
		<div
		// className={s.posts}
		>
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

export default TimeLine