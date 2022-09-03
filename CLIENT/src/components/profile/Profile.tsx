import { useAppSelector } from '../../hooks/reactReduxHooks'
import MyPosts from '../homePage/myPosts/MyPosts'
import MyInfo from './myInfo/MyInfo'//@ts-ignore
import s from './MyProfile.module.css'

const Profile: React.FC = () => {
	const { defaultUser } = useAppSelector(state => state.profilePage)

	return (
		<section >
			<MyInfo />

			<div className={s.profile}>

				<MyPosts />
				<div className={s.info}>
					<h3>User Information</h3>

					<ul>
						<li><span>Birthday:</span> {defaultUser.birthday}</li>
						<li><span>Hometowen:</span> {defaultUser.city}</li>
						<li><span>Country:</span> {defaultUser.country}</li>
						<li><span>Company:</span> {defaultUser.work}</li>
						<li><span>Languages:</span> {defaultUser.languages.join(', ')}</li>
					</ul>
				</div>
			</div>
		</section>
	)
}


export default Profile
