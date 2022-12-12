import s from './Btns.module.scss'

const Btn1 = (props) => {

	const clik = (e) => {
		e.preventDefault()
		props.onClick(props.data)
	}

	return (
		<button
			className={props.disabled && props.cnanging ? `${s.btn1} ${s.disabled}` : s.btn1}
			onClick={clik}
			disabled={props.disabled}
		>
			{props.text}
		</button >)
}
export default Btn1

