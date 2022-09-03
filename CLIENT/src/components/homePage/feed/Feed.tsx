import Share from '../share/Share'//@ts-ignore
import s from './Feed.module.css'

const Feed = () => {
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

export default Feed