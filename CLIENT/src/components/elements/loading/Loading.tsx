import s from './Loading.module.scss'
//@ts-ignore
import loading from './Loading.svg'

const Loading = () => {
	return (
		<div className={s.loading} >
			<img src={loading} />
		</div>
	)
}

export default Loading