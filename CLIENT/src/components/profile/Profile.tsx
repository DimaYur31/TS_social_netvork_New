import React from 'react'

import { getUserData } from '../../api/userApi'

import MyPosts from '../homePage/myPosts/MyPosts'

import useGetPageData from '../../hooks/useGetPageDats'

import s from './Profile.module.scss'

import About from './myInfo/about/About'
import MyInfo from './myInfo/MyInfo'


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