import s from './Loading.module.scss'

import loading from './Loading.svg'

export const Loading = () => {
	return (
		<div className={s.loading} >
			<img src={loading} alt='loading' />
		</div>
	)
}