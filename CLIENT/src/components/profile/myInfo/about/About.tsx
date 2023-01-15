import React, { FC, useState } from 'react'

import { useIsOwner } from '../../../../hooks/hooks'

import Modal from '../../../elements/modal/Modal'

import { UserType } from '../../../../types/profile'

import { SVG } from './../../../../img/icons/exportIcons'
import s from './About.module.scss'

import ProfileFormSetings from './profileForm/ProfileFormSetings'

const About: FC<{ user: UserType }> = ({ user }) => {
	const { birthday, city, country, job, languages, name, surname, _id } = user
	const [isOpen, setIsOpen] = useState(false)
	const isOwner = useIsOwner(_id)

	return (
		<div className={s.info}>
			<h3>{`${name} ${surname}`}
				{isOwner &&
					<button className={s.open}
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

export default React.memo(About)