import React from 'react'//@ts-ignore
import s from './Post.module.css'
import { useAppSelector } from '../../../../hooks/reactReduxHooks'
import { useAvatar } from './../../../../hooks/hooks';
import SmalAvatar from '../../../styleedComponents/SmalAvatar';

type TPost = {
	post: {
		id: number
		postImg: string
		timeago: string
		likes: number
		coments: number
		text: string
	}
}

// const Post = ({ user: { avatar, fullName }, post: { message, liks } }) => {
const Post: React.FC<TPost> = ({ post }) => {
	const { defaultUser } = useAppSelector(state => state.profilePage)
	const avatar = useAvatar()
	return (
		<div className={s.post} >
			<div className={s.head}>
				<SmalAvatar src={avatar} />				<p>{defaultUser.name}</p>
				<p className={s.time}>5 minets ago</p>
				<span>...</span>
			</div>

			<div className={s.body}>
				<p>{post.text}</p>
				<div>
					<img src={post.postImg} />
				</div>
			</div>

			<div className={s.statistics} >
				<div>
					<span>Like</span>
					<span>Dislike</span>
					<p>{`${post.likes} people like it`}</p>
				</div>
				<div>
					<p>{`${post.coments} comments`}</p>
				</div>
			</div>
		</div>
	)
}
export default Post