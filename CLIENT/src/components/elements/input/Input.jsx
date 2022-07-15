import React from 'react'
import s from './Input.module.css'

const Input = (props) => {
	return <input
		className={s.input}
		type="text"
		value={props.value}
		onChange={(e) => props.onChange(e.target.value)}
		onBlur={() => props.onBlur}
		autoFocus={true}
	/>
}

export default Input