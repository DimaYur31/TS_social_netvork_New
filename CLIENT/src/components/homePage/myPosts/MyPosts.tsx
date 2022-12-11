import { useEffect } from 'react'
import s from './MyPosts.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { fetchPostsThunk } from '../../../store/slices/apiActions/postActions'

import Post from './post/Post'

const MyPosts = () => {
	const { _id } = useAppSelector(store => store.profilePage.renderUser)
	const { posts } = useAppSelector(store => store.postPage)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchPostsThunk(_id))
	}, [_id])

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

export default MyPosts