const ACTIONS = {
	JOIN: 'join',//присоединиться
	LEAVE: 'leave',//покинуть комнату
	SHARE_ROOMS: 'share-rooms',// поделиться комнатами
	ADD_PEER: 'add_peer',//создать соединение между клиентами
	REMOVE_PEER: 'remove_peer',//удалить соединение между клиентами
	RELAY_SDP: 'relay_sdp', //передача sdp данных т.е. стримы с медиа-данными
	RELAY_ICE: 'relay_ice',// перердача ice кондидатов т.е. физические подключения
	ICE_CANDIDATE: 'ice-candidate',
	SESSION_DESCRIPTION: 'sessionn_description'//при поступлениии новой сессии чтобы ее использовать
}

module.exports = ACTIONS