import { useState } from 'react'
import { useAppSelector } from '../../../../hooks/reactReduxHooks'
import s from './About.module.scss'
import { useIsOwner } from '../../../../hooks/hooks'
import { SVG } from './../../../../img/icons/exportIcons'

import ProfileFormSetings from './profileForm/ProfileFormSetings'
import Modal from '../../../elements/modal/Modal'

const About = () => {
	const { birthday, city, country, job, languages, name, surname } = useAppSelector(state => state.profilePage.renderUser)
	const [isOpen, setIsOpen] = useState(false)
	const isOwner = useIsOwner()

	return (
		<div className={s.info}>
			<h3>{`${name} ${surname}`}
				{isOwner &&
					<button
						className={s.open}
						onClick={() => setIsOpen(true)}
					>
						<SVG.Settings className={s.settings} />
					</button>}
			</h3>

			<ul>
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