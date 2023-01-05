import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useRenderUser } from '../../hooks/hooks'
import { useAppSelector } from '../../hooks/reactReduxHooks'
import { selectDefaultUserId } from '../../selectors/selectors'
import s from './HomePage.module.scss'

import Feed from './feed/Feed'
import RightBar from './rightBar/RightBar'
import TimeLine from './timeline/TimeLine'


const HomePage = () => {
	console.log('HomePage render')
	const location = useLocation()

	const _id = useAppSelector(selectDefaultUserId)

	useRenderUser()
	useEffect(() => {
		location.pathname = `${_id}`
	}, [])

	return (
		<div className={s.home}>
			<div className={s.left}>
				<Feed />
				<TimeLine />
			</div>
			<RightBar />
		</div>
	)
}

export default React.memo(HomePage)