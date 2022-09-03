import { io, ManagerOptions, SocketOptions } from 'socket.io-client'

const options: Partial<ManagerOptions & SocketOptions> = {
	forceNew: true,
	reconnection: true,//переподключение при разрыве конекта
	timeout: 10000,// интервал переподключения
	transports: ['websocket']// для кросбраузерных запросов
}

export const socket = io('http://localhost:4020', options)