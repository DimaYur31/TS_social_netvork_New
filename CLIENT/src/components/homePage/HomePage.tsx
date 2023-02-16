import { memo } from 'react';
import { RightBar } from './rightBar/RightBar';
import { TimeLine } from './timeline/TimeLine';
import { Share } from './share/Share';
import style from './HomePage.module.scss';

export const HomePage = memo(function HomePage() {
	return (
		<div className={style.home}>
			<div className={style.left}>
				<Share />
				<TimeLine />
			</div>
			<RightBar />
		</div>
	);
});