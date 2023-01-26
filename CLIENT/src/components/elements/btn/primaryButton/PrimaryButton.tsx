import { ButtonHTMLAttributes, DetailedHTMLProps, FC, memo } from 'react'

import s from './PrimaryButton.module.scss'

type PostType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const PrimaryButton: FC<PostType> = memo(({ children }, props) => {
	return <button className={s.btn} {...props}>
		{children}
	</button>
})