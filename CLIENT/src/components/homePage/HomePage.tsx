import React from 'react'
import Feed from './feed/Feed'
import MyPosts from './myPosts/MyPosts'//@ts-ignore
import s from './HomePage.module.css'
import RightBar from './rightBar/RightBar'

const HomePage = () => {
	return (
		<div className={s.home}>
			<div>
				<Feed />
				<MyPosts />
			</div>
			<RightBar />

		</div>
	)
}

export default HomePage