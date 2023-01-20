import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'

import s from './PrimaryInput.module.scss'

type InputPropps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const PrimaryInput: FC<InputPropps> = (props) => {
	return <input
		className={s.customInput}
		{...props} />
}

export default React.memo(PrimaryInput)