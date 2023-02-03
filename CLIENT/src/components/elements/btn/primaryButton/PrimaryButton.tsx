import { ButtonHTMLAttributes, DetailedHTMLProps, memo } from 'react';
import style from './PrimaryButton.module.scss';

type PostType = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
>

export const PrimaryButton = memo((props: PostType) => {
	return (
		<button className={style.btn} {...props}>
			{props.children}
		</button>
	);
});