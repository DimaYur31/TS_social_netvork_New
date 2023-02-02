import { memo, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'timeago.js'
import { useAppSelector } from '../../../../hooks/reactReduxHooks'
import { PostType } from '../../../../types/post'
import { selectDefaultUser } from '../../../../selectors/selectors'
import { getUserData } from '../../../../api/userApi'
import { SmalAvatar } from '../../../styleedComponents/SmalAvatar'
import { ButtonsPopap } from '../../../elements/popap/ButtonsPopap/ButtonsPopap'
import { LikeDislikeComponent } from '../../../elements/likedislike/LikeDislikeComponent'
import { usePhotosPath } from './../../../../hooks/hooks'
import style from './Post.module.scss'

type PostProps = {
	post: PostType<string>
}

export const Post = memo(({ post }: PostProps) => {
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
		<div className={style.post} >

			<div className={style.head}>
				<Link to={`/profile/${thisUser._id}`}>
					<SmalAvatar src={usePhotosPath(thisUser.avatar)} />
					<p className={style.time}>{thisUser.name}</p>
				</Link>
				<p className={style.time}>{format(post.createdAt)}</p>
				<ButtonsPopap post={post} />
			</div>

			<div
				onClick={() => navigate(`/post/${post._id}`)} className={style.body}
			>
				<div>
					<img src={usePhotosPath(post.img)} alt='post-img' />
				</div>
				<p className={style.text} >{post.text}</p>
			</div>

			<div className={style.statistic} >
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
})