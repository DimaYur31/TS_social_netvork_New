import { useRenderUser } from '../../hooks/hooks'
import Feed from './feed/Feed'
import RightBar from './rightBar/RightBar'
import TimeLine from './timeline/TimeLine'
//@ts-ignore
import s from './HomePage.module.css'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/reactReduxHooks'


const HomePage = () => {
	const location = useLocation()

	// проверить
	const { _id } = useAppSelector(state => state.profilePage.defaultUser)
	// проверить

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

export default HomePage