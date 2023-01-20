import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import s from './PrimaryButton.module.scss'

type PostType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const PrimaryButton: FC<PostType> = ({ children }, props) => {
	return <button className={s.btn} {...props}>
		{children}
	</button>
}
export default React.memo(PrimaryButton)