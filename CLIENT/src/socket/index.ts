import { io, ManagerOptions, SocketOptions } from 'socket.io-client'

const options: Partial<ManagerOptions & SocketOptions> = {
	forceNew: true,
	reconnection: true,//переподключение при разрыве конекта
	timeout: 10000,// интервал переподключения
	transports: ['websocket']// для кросбраузерных запросов
}

const path = process.env.REACT_APP_API_URL || 'http://localhost:4020'

export const socket = io(path, options)