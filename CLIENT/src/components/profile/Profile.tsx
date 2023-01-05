import React from 'react'
import s from './Profile.module.scss'

import MyPosts from '../homePage/myPosts/MyPosts'
import About from './myInfo/about/About'
import MyInfo from './myInfo/MyInfo'

const Profile = () => {
	console.log('Profile render')
	return (
		<section >
			<MyInfo />
			<div className={s.profile}>
				<MyPosts />
				<About />
			</div>
		</section>
	)
}

export default React.memo(Profile)
