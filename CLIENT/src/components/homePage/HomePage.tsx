import React from 'react'

import s from './HomePage.module.scss'

import RightBar from './rightBar/RightBar'
import TimeLine from './timeline/TimeLine'
import Share from './share/Share'

const HomePage = () => {

	return (
		<div className={s.home}>
			<div className={s.left}>
				<Share />
				<TimeLine />
			</div>
			<RightBar />
		</div>
	)
}

export default React.memo(HomePage)