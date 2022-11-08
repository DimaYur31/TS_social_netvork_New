import React, { MouseEvent, useState } from 'react'//@ts-ignore
import s from './Post.module.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reactReduxHooks'
import { getPhoto, useAvatar } from './../../../../hooks/hooks'
import SmalAvatar from '../../../styleedComponents/SmalAvatar'
import { PostType } from '../../../../types/post'
import { format } from 'timeago.js'
import { likeDislikeThunk } from '../../../../store/slices/apiActions/postActions'
import { getUserData } from '../../../../api/userApi'
import ButtonsPopap from '../../../elements/popap/ButtonsPopap/ButtonsPopap'
import { SVG } from '../../../../img/icons/exportIcons'
import { Link } from 'react-router-dom'

type TPost = {
	post: PostType<string>
}

const Post: React.FC<TPost> = ({ post }) => {
	const { defaultUser } = useAppSelector(state => state.profilePage)
	const [isLiked, setIsLiked] = useState(post.likes.includes(defaultUser._id))
	const avatar = useAvatar()
	const dispatch = useAppDispatch()

	const hendlerLikes = (e: MouseEvent<HTMLSpanElement>) => {
		e.preventDefault()
		dispatch(likeDislikeThunk(defaultUser._id, post._id))
		// setIsLiked(!isLiked)
	}

	interface getUserDataInterface {
		(id: string): Promise<{ img: string, name: string }>
	}

	const getUsersData: getUserDataInterface = async (id) => {
		let user
		if (post.userId === defaultUser._id) {
			return user = { img: avatar, name: defaultUser.name }
		} else {
			let user = await getUserData(id)
			return user = { img: user.avatar, name: user.name }
		}
	}

	let currentUser = getUsersData(post.userId)


	return (
		<div className={s.post} >

			<div className={s.head}>
				<Link to={`/profile/${defaultUser}`}>
					<SmalAvatar src={avatar} />
					<p className={s.time}>{defaultUser.name}</p>
				</Link>
				<p className={s.time}>{format(post.createdAt)}</p>
				<ButtonsPopap post={post} />
			</div>


			<div className={s.body}>
				<div>
					<img src={getPhoto(post.img)} />
				</div>
				<p>{post.text}</p>
			</div>

			<div className={s.statistics} >
				<div>
					<span onClick={(e) => hendlerLikes(e)}><SVG.Like /></span>
					<p>{`${post.likes.length} likes`}</p>
					<span><SVG.Dislike /></span>
				</div>

				<div>
					{/* {`${post.coments} comments`} */}
					9 comments
				</div>
			</div>
		</div>
	)
}
export default Post