import { useRenderUser } from '../../hooks/hooks'
import Feed from './feed/Feed'
import RightBar from './rightBar/RightBar'
import TimeLine from './timeline/TimeLine'
//@ts-ignore
import s from './HomePage.module.css'

const HomePage = () => {
	useRenderUser()

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