import React, { useState } from 'react'
import Input from '../../elements/input/Input'

const Status = ({ status }) => {
	const [editMode, setEditMode] = useState(false)

	const activateEditMode = () => setEditMode(true)
	const deactivateEditMode = () => setEditMode(false)

	return (
		<>
			{!editMode
				? <p onDoubleClick={() => activateEditMode()}>{status}</p>
				: <Input
					placeholder={status}
					// onChange={setStatus}
					onBlur={deactivateEditMode}
					value={status}
				/>

			}
		</>
	)
}

export default Status


// this.forceUpdate()
	//надо избегать этого метода, для крайних случаев
	// this.sеtState({editMode: true}) так правильно в классах но чего-то не работает


	// this.forceUpdate()
	// -------------------------------
	// componentDidUpdate(prevProps, prevState) {
	// let a = this.state
	// let b = this.props
	// alert('update')
	// }
	// -------------------------------
