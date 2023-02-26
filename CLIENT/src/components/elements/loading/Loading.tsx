import style from './Loading.module.scss';

import loading from './Loading.svg';

export const Loading = () => {
	return (
		<div className={style.loading} >
			<img src={loading} alt='loading' />
		</div>
	);
};