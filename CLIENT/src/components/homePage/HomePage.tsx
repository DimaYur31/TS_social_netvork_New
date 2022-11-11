import Feed from './feed/Feed'
import RightBar from './rightBar/RightBar'
// import MyPosts from './myPosts/MyPosts'
//@ts-ignore
import s from './HomePage.module.css'
import { useRenderUser } from '../../hooks/hooks'

const HomePage = () => {
	useRenderUser()

	return (
		<div className={s.home}>
			<div className={s.left}>
				<Feed />
				{/* <MyPosts /> */}
				{/* timeline должен быть */}
			</div>
			<RightBar />
		</div>
	)
}

export default HomePage