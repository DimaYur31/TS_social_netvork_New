import { useState } from 'react';
import { useIsOwner } from '../../../../hooks/hooks';
import { UserType } from '../../../../types/profile';
import { OverLayPopap } from '../../../elements/UiKit/OverLayPopap';
import { SVG } from './../../../../img/icons/exportIcons';
import { ProfileFormSetings } from './profileForm/ProfileFormSetings';
import style from './About.module.scss';

type AboutProps = {
	user: UserType
	reload: () => void
}

export const About = ({ user, reload }: AboutProps) => {

	const { birthday, city, country, job, languages, name, surname, _id } = user;
	const [isOpen, setIsOpen] = useState(false);
	const isOwner = useIsOwner(_id);

	return (
		<div className={style.info}>
			<h3>{`${name} ${surname}`}
				{isOwner &&
					<button className={style.open}
						onClick={() => setIsOpen(true)}
					>
						<SVG.Settings className={style.settings} />
					</button>
				}
			</h3>

			<ul>
				<li><span>Birthday:</span><time dateTime={birthday}></time> {birthday}</li>
				<li><span>City:</span> {city}</li>
				<li><span>Country:</span> {country}</li>
				<li><span>Job:</span> {job}</li>
				<li><span>Languages:</span> {languages.join(', ')}</li>
			</ul>

			<OverLayPopap
				isOpened={isOpen}
				onClose={() => setIsOpen(!isOpen)}
			>
				<ProfileFormSetings onClose={setIsOpen} reload={reload} />
			</OverLayPopap >
		</div>
	);
};