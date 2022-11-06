import Feed from './feed/Feed'
import RightBar from './rightBar/RightBar'
import MyPosts from './myPosts/MyPosts'//@ts-ignore
import s from './HomePage.module.css'

const HomePage = () => {
	return (
		<div className={s.home}>
			<div className={s.left}>
				<Feed />
				<MyPosts />
			</div>
			<RightBar />
		</div>
	)
}

export default HomePage