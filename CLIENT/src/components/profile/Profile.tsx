import MyPosts from '../homePage/myPosts/MyPosts'
import About from './myInfo/about/About'
import MyInfo from './myInfo/MyInfo'

//@ts-ignore
import s from './MyProfile.module.css'

const Profile: React.FC = () => {

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

export default Profile
