//@ts-ignore
import loading from './Loading.svg'//@ts-ignore
import s from './Loading.module.css'

const Loading = () => {
	return (
		<div className={s.loading} >
			<img src={loading} />
		</div>
	)
}

export default Loading