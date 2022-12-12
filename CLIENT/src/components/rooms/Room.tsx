import { useParams } from 'react-router-dom'
import useWebRTC, { LOCAL_VIDEO } from '../../hooks/useWebRTC'
import s from './Room.module.scss'

interface IPairs {
	[index: number]: number
}

const loyout = (clientsNumber = 1) => {
	const pairs = Array.from({ length: clientsNumber })
		.reduce<unknown[]>((acc, next, index, arr: unknown[]) => {
			if (index % 2 === 0) {
				acc.push(arr.slice(index, index + 2))
			}
			return acc
		}, [])

	const rowsNumber = pairs.length
	const height = `${95 / rowsNumber}%`

	return pairs.map<Array<IPairs>>((row: any, index, arr) => {
		if (index === arr.length - 1 && row.length === 1) {
			return [{
				width: '100%',
				height
			}]
		}

		return row.map(() => ({
			width: '50%',
			height
		}))
	}).flat()
}

const Room = () => {
	const { id: roomID } = useParams()
	const { clients, provideMediaRef } = useWebRTC(roomID)
	const videoLayout = loyout(clients.length)

	return (
		<div className={s.room}>
			{
				clients.map((clientID: string, index: number) => {
					return (
						<div key={clientID} style={videoLayout[index]} id={clientID}>
							<video
								ref={instance => { provideMediaRef(clientID, instance) }}// передаем в peerMediaElements
								autoPlay
								playsInline
								muted={clientID === LOCAL_VIDEO}
							/>
						</div>
					)
				})
			}
		</div>
	)
}

export default Room