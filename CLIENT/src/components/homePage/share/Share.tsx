import { useAvatar } from '../../../hooks/hooks'
import { StyledInput } from '../../styleedComponents/Input'
import SmalAvatar from '../../styleedComponents/SmalAvatar'
import s from './Share.module.css'

const Share = () => {
	const avatar = useAvatar()
	return <div className={s.share}>
		<SmalAvatar src={avatar} />
		<StyledInput />
	</div>
}

export default Share