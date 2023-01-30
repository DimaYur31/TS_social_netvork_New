import { memo } from 'react'

import { useTheme } from '../../../../hooks/useTheme'

import style from './LightDarkCheckbox.module.scss'

export const LightDarkCheckbox = memo(() => {
	const { theme, setTheme } = useTheme()
	return (
		<label className={style.label} >
			<input
				type='checkbox'
				checked={theme === 'light' ? true : false}
				onChange={() => theme === 'light' ? setTheme('dark') : setTheme('light')}
			/>
			<span className={style.check} ></span>
		</label>
	)
})