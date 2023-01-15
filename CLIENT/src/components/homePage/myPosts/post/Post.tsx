import React, { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'timeago.js'

import { useAppSelector } from '../../../../hooks/reactReduxHooks'

import { PostType } from '../../../../types/post'
import { selectDefaultUser } from '../../../../selectors/selectors'
import { getUserData } from '../../../../api/userApi'


import SmalAvatar from '../../../styleedComponents/SmalAvatar'
import ButtonsPopap from '../../../elements/popap/ButtonsPopap/ButtonsPopap'
import LikeDislikeComponent from '../../../elements/likedislike/LikeDislikeComponent'

import s from './Post.module.scss'
import { usePhotosPath } from './../../../../hooks/hooks'

type TPost = {
	post: PostType<string>
}

const Post: FC<TPost> = ({ post }) => {
	const navigate = useNavigate()
	const defaultUser = useAppSelector(selectDefaultUser)
	const [thisUser, setThisUser] = useState(defaultUser)

	const getUsersData = async (id: string) => {
		if (post.userId === defaultUser._id) {
			setThisUser(defaultUser)
		} else {
			await getUserData(id)
				.then((data) => setThisUser(data))
		}
	}

	useEffect(() => {
		getUsersData(post.userId)
	}, [post.userId])

	return (
		<div className={s.post} >

			<div className={s.head}>
				<Link to={`/profile/${thisUser._id}`}>
					<SmalAvatar src={usePhotosPath(thisUser.avatar)} />
					<p className={s.time}>{thisUser.name}</p>
				</Link>
				<p className={s.time}>{format(post.createdAt)}</p>
				<ButtonsPopap post={post} />
			</div>

			<div onClick={() => navigate(`/post/${post._id}`)} className={s.body}>
				<div>
					<img src={usePhotosPath(post.img)} />
				</div>
				<p>{post.text}</p>
			</div>

			<div className={s.statistic} >
				<LikeDislikeComponent
					likes={post.likes}
					dislikes={post.dislikes}
					currentObjectId={post._id}
					currentObjectUserId={post.userId}
				/>
				9 comments
			</div>
		</div >
	)
}

export default React.memo(Post)