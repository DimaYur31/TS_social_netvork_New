import React from 'react';
import s from './Post.module.css';
import Btn1 from '../../../elements/btn/Btn1'

const Post = ({ user: { avatar, fullName }, post: { message, liks } }) => {
	return (
		<div className={s.post} >
			<img src={avatar} />

			<div>
				<h4>{fullName}</h4>
				<p>{message}</p>
			</div>

			<Btn1 text='Like' />

			<span>{liks}</span>

			<Btn1 text='Dislike' />
		</div>
	)
}
export default Post;