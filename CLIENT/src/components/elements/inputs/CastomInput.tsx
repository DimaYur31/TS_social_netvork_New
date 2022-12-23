import React, { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import s from './CustomInput.module.scss'

type InputPropps = {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const CastomInput: FC<InputPropps> = ({ onChange }, props) => {
	console.log('CastomInput render')
	return <input
		className={s.customInput}
		onChange={(e) => onChange(e)}
		{...props} />
}

export default React.memo(CastomInput)