import React from 'react'
import { getUserData } from '../../api/userApi'
import s from './Profile.module.scss'

import MyPosts from '../homePage/myPosts/MyPosts'
import About from './myInfo/about/About'
import MyInfo from './myInfo/MyInfo'
import useGetPageData from '../../hooks/useGetPageDats'

const Profile = () => {
	const { data: user, renderId } = useGetPageData(2, getUserData)

	return (
		<section >
			{
				user && <>
					<MyInfo user={user} />
					<div className={s.profile}>
						<MyPosts _id={renderId} />
						<About user={user} />
					</div>
				</>
			}
		</section>
	)
}

export default React.memo(Profile)