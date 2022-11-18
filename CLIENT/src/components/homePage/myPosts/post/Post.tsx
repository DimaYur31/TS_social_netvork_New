import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
//@ts-ignore
import s from './Post.module.css'
import { useAppSelector } from '../../../../hooks/reactReduxHooks'
import { getPhoto } from './../../../../hooks/hooks'
import SmalAvatar from '../../../styleedComponents/SmalAvatar'
import { PostType } from '../../../../types/post'
import { getUserData } from '../../../../api/userApi'
import ButtonsPopap from '../../../elements/popap/ButtonsPopap/ButtonsPopap'
import LikeDislikeComponent from '../../../elements/likedislike/LikeDislikeComponent'

type TPost = {
	post: PostType<string>
}

const Post: FC<TPost> = ({ post }) => {
	const { defaultUser } = useAppSelector(state => state.profilePage)
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
					<SmalAvatar src={getPhoto(thisUser.avatar)} />
					<p className={s.time}>{thisUser.name}</p>
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

			<div className={s.statistic} >

				<LikeDislikeComponent
					likes={post.likes}
					dislikes={post.dislikes}
					currentObjectId={post._id}
					currentObjectUserId={post.userId}
				/>
				{/* {`${post.coments} comments`} */}
				9 comments
			</div>
		</div >
	)
}

export default Post