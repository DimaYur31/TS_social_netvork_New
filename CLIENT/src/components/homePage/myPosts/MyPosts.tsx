import Post from './post/Post'//@ts-ignore
import s from './MyPosts.module.css'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks';
import { fetchPostsThunk } from '../../../store/slices/apiActions/postActions'

const MyPosts = () => {
	const { _id } = useAppSelector(store => store.profilePage.renderUser)//????
	const { posts } = useAppSelector(store => store.postPage)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchPostsThunk(_id))
	}, [])

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