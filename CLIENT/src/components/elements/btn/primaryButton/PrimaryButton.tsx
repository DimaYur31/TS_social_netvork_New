import { ButtonHTMLAttributes, DetailedHTMLProps, memo } from 'react';
import style from './PrimaryButton.module.scss';

type ButtonType = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
>

export const PrimaryButton = memo((props: ButtonType) => {
	return (
		<button className={style.btn} {...props}>
			{props.children}
		</button>
	);
});