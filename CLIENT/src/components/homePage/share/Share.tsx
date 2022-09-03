import React from 'react'
import { useAvatar } from '../../../hooks/hooks'
import Input from '../../elements/input/Input'
import { StyledInput } from '../../styleedComponents/Input'
import SmalAvatar from '../../styleedComponents/SmalAvatar'//@ts-ignore
import s from './Share.module.css'

const Share = () => {
	const avatar = useAvatar()
	return (
		<div className={s.share}>
			<SmalAvatar src={avatar} />
			{/* <Input /> */}
			<StyledInput />
		</div>
	)
}

export default Share