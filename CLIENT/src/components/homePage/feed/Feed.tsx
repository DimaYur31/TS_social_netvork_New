import React from 'react'
import s from './Feed.module.scss'
import Share from '../share/Share'

const Feed = () => {
	console.log('Feed render')
	return (
		<div className={s.feed}>
			<Share />
			<hr />

			<div className={s.buttons}>
				<span>Photo or Video</span>
				<span>Tag</span>
				<span>Location</span>
				<span>Feelings</span>
				<button>Share</button>
			</div>
		</div>
	)
}

export default React.memo(Feed)