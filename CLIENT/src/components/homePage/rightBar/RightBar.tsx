import FriendList from '../../friends/FriendList'
import React from 'react'//@ts-ignore
import s from './RightBar.module.css'

const RightBar = () => {
	return (
		<div className={s.rightBar}>
			<p>Todey is dey ....</p>
			<h3>Online Friends</h3>
			<FriendList />
		</div>
	)
}

export default RightBar