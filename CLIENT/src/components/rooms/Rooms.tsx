import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACTIONS } from '../../socket/actions'
import { socket } from '../../socket/index'
import { v4 } from 'uuid'

const Rooms = () => {
	const navigate = useNavigate()
	const [rooms, updateRooms] = useState<string[]>([])
	const rootNode = useRef() as React.MutableRefObject<HTMLDivElement>

	useEffect(() => {
		socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
			if (rootNode.current) {
				updateRooms(rooms)
			}
		})
	}, [])

	const createNewRoom = (e: React.MouseEvent<HTMLButtonElement>, roomID?: string) => {
		e.preventDefault()

		if (roomID) {
			navigate(`/rooms/${roomID}`)
		} else {
			navigate(`${v4()}`)
		}
	}


	return (
		<div ref={rootNode}>
			<h2>Available Rooms</h2>

			<ul>
				{
					rooms.map(roomID => (
						<li key={roomID}>
							{roomID}
							<button onClick={(e) => {
								createNewRoom(e, roomID)
							}}>JOIN ROOM</button>
						</li>
					))}
			</ul>

			<button onClick={(e) => createNewRoom(e)}>Create new room</button>
		</div>
	)
}

export default Rooms
