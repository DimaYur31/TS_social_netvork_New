import { RightBar } from './rightBar/RightBar';
import { TimeLine } from './timeline/TimeLine';
import { Share } from './share/Share';
import style from './HomePage.module.scss';

const HomePage = () => {
	return (
		<div className={style.home}>
			<div className={style.left}>
				<Share />
				<TimeLine />
			</div>
			<RightBar />
		</div>
	);
};

export default HomePage;