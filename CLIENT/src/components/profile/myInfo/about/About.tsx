import { useState } from 'react'
import { useAppSelector } from '../../../../hooks/reactReduxHooks'
import Modal from '../../../elements/modal/Modal'

//@ts-ignore
import s from '../../MyProfile.module.css'
import ProfileFormSetings from './profileForm/ProfileFormSetings'
import { SVG } from './../../../../img/icons/exportIcons'




const About = () => {
	const { defaultUser } = useAppSelector(state => state.profilePage)
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className={s.info}>
			<h3>About Me
				<button className={s.open} onClick={() => setIsOpen(true)}>
					<SVG.Settings className={s.settings} />
				</button>
			</h3>

			<ul onDoubleClick={() => alert('clik')}>
				<li><span>Birthday:</span><time dateTime={defaultUser.birthday}></time> {defaultUser.birthday}</li>
				<li><span>City:</span> {defaultUser.city}</li>
				<li><span>Country:</span> {defaultUser.country}</li>
				<li><span>Job:</span> {defaultUser.job}</li>
				<li><span>Languages:</span> {defaultUser.languages.join(', ')}</li>
			</ul>

			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				<ProfileFormSetings />
			</Modal>
		</div>
	)
}

export default About