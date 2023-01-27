import { memo } from 'react'

import s from './HomePage.module.scss'

import { RightBar } from './rightBar/RightBar'
import { TimeLine } from './timeline/TimeLine'
import { Share } from './share/Share'

export const HomePage = memo(() => {
	return (
		<div className={s.home}>
			<div className={s.left}>
				<Share />
				<TimeLine />
			</div>
			<RightBar />
		</div>
	)
})