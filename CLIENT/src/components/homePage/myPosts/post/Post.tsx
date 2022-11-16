import { FC, useEffect, useState } from 'react'
import { format } from 'timeago.js'
//@ts-ignore
import s from './Post.module.css'
import { useAppSelector } from '../../../../hooks/reactReduxHooks'
import { getPhoto } from './../../../../hooks/hooks'
import SmalAvatar from '../../../styleedComponents/SmalAvatar'
import { PostType } from '../../../../types/post'
// import { likeDislikeThunk } from '../../../../store/slices/apiActions/postActions'
import { getUserData } from '../../../../api/userApi'
import ButtonsPopap from '../../../elements/popap/ButtonsPopap/ButtonsPopap'
import { SVG } from '../../../../img/icons/exportIcons'
import { Link } from 'react-router-dom'
// import { UserType } from '../../../../types/profile'

type TPost = {
	post: PostType<string>
}

const Post: FC<TPost> = ({ post }) => {
	// const dispatch = useAppDispatch()
	const { defaultUser, renderUser } = useAppSelector(state => state.profilePage)
	const [thisUser, setThisUser] = useState(defaultUser)
	// const [isLiked, setIsLiked] = useState(post.likes.includes(defaultUser._id))

	// const hendlerLikes = (e: MouseEvent<HTMLSpanElement>) => {
	// 	e.preventDefault()
	// 	dispatch(likeDislikeThunk(defaultUser._id, post._id))
	// 	// setIsLiked(!isLiked)
	// }

	// interface getUserDataInterface {
	// 	(id: string): Promise<UserType>
	// }

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

			<div className={s.statistics} >
				<div>
					<span
					//  onClick={(e) => hendlerLikes(e)}
					><SVG.Like /></span>
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