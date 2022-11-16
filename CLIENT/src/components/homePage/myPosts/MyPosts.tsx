import Post from './post/Post'
//@ts-ignore
import s from './MyPosts.module.css'
import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { fetchPostsThunk } from '../../../store/slices/apiActions/postActions'
import { PostType } from '../../../types/post'
import { setPosts } from '../../../store/slices/postsSlice'

type PropsType = {
	allPosts?: PostType<string>[]
}

const MyPosts: FC<PropsType> = () => {
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