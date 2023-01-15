import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import s from './PrimaryButton.module.scss'

const PrimaryButton: FC<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({ children }, props) => {
	console.log('render primaryButton')
	return <button className={s.btn} {...props}>
		{children}
	</button>
}
export default React.memo(PrimaryButton)

