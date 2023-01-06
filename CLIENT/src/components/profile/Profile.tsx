import React, { useState } from 'react'
import { getUserData } from '../../api/userApi'
import s from './Profile.module.scss'

import MyPosts from '../homePage/myPosts/MyPosts'
import About from './myInfo/about/About'
import MyInfo from './myInfo/MyInfo'
import useGetPageData from '../../hooks/useGetPageDats'
import { UserType } from '../../types/profile'

const Profile = () => {
	const { data: user, renderId } = useGetPageData(2, getUserData)
	const [test, setTest] = useState(false)




	console.log('Profile render')
	return (
		<section >
			{
				user && <>
					<MyInfo user={user} />
					<button onClick={() => setTest(!test)}>test</button>
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
