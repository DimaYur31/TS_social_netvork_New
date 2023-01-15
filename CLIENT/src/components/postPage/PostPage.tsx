import React from 'react'

import Post from '../homePage/myPosts/post/Post'
import useGetPageData from '../../hooks/useGetPageDats'
import { getPost } from '../../api/postAPI'

const PostPage = () => {
	const { data: post } = useGetPageData(2, getPost)
	return <>
		{
			post &&
			<Post post={post} />
		}
	</>

}

export default React.memo(PostPage)