import { DetailedHTMLProps, FC, InputHTMLAttributes, memo } from 'react';
import style from './PrimaryInput.module.scss';

type InputPropps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const PrimaryInput: FC<InputPropps> = memo((props) => {
	return <input
		className={style.customInput}
		{...props} />;
});