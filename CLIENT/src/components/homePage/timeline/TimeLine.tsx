import { useEffect } from 'react'
import s from './TimeLine.module.css'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { fetchTimeLineThunk } from '../../../store/slices/apiActions/postActions'
import Post from '../myPosts/post/Post'

const TimeLine = () => {
	const dispatch = useAppDispatch()
	const { defaultUser } = useAppSelector(store => store.profilePage)
	const { posts } = useAppSelector(store => store.postPage)


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

export default TimeLine