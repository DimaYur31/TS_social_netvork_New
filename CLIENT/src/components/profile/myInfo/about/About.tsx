import { useState } from 'react'
import { useAppSelector } from '../../../../hooks/reactReduxHooks'
import Modal from '../../../elements/modal/Modal'
import s from '../../MyProfile.module.css'
import ProfileFormSetings from './profileForm/ProfileFormSetings'
import { SVG } from './../../../../img/icons/exportIcons'
import { useIsOwner } from '../../../../hooks/hooks'

const About = () => {
	const { birthday, city, country, job, languages } = useAppSelector(state => state.profilePage.renderUser)
	const [isOpen, setIsOpen] = useState(false)
	const isOwner = useIsOwner()
	return (
		<div className={s.info}>
			<h3>About Me
				{isOwner ? <button className={s.open} onClick={() => setIsOpen(true)}>
					<SVG.Settings className={s.settings} />
				</button>
					: null
				}
			</h3>

			<ul onDoubleClick={() => alert('clik')}>
				<li><span>Birthday:</span><time dateTime={birthday}></time> {birthday}</li>
				<li><span>City:</span> {city}</li>
				<li><span>Country:</span> {country}</li>
				<li><span>Job:</span> {job}</li>
				<li><span>Languages:</span> {languages.join(', ')}</li>
			</ul>

			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				<ProfileFormSetings />
			</Modal>
		</div>
	)
}

export default About