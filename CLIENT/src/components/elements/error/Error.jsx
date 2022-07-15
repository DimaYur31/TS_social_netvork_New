import React from 'react'

const Error = ({ error }) => {
	return (
		!error
			? <div style={{ height: '18px' }}></div>
			: <div style={{ color: 'red' }}>{error}</div>
	)
}

export default Error