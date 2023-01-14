import { usePhotosPath } from '../../../hooks/hooks'
import s from './Share.module.scss'

import SmalAvatar from '../../styleedComponents/SmalAvatar'
import Search from '../../styleedComponents/Search'
import PrimaryButton from '../../elements/btn/primaryButton/PrimaryButton'

const Share = () => {
	const avatar = usePhotosPath()

	return <div className={s.share}>
		<SmalAvatar src={avatar} />
		<Search />
		<PrimaryButton >Serch</PrimaryButton>
	</div>
}

export default Share