// Dictionnaire global de rooms
const rooms = new Map<string, Set<WSPeer>>()

export default defineWebSocketHandler({
    open(peer) {
        peer.data = {}
        console.log(`[WS] SERVER connecté: ${peer.id}`, rooms)
    },
    message(peer, raw) {
        const payload = JSON.parse(raw.toString())
        console.log(`[WS] SERVER message: ${peer.id}`, payload)

        const { roomId, userName, type, content } = payload || {}

        switch (type) {
            case 'createRoom': {
                if (!roomId) {
                    peer.send(JSON.stringify({
                        type: 'error',
                        message: 'roomId not provide during createRoom'
                    }))
                    return
                }
                rooms.set(roomId, new Set([peer]))
                peer.data.roomId = roomId
                peer.send(JSON.stringify({
                    type: 'roomCreated',
                    roomId,
                    userName,
                }))
                break
            }

            case 'joinRoom': {
                const room = rooms.get(roomId)

                if (!room) {
                    peer.send(JSON.stringify({
                        type: 'error',
                        message: `Room ${roomId} not found`
                    }))
                    return
                }

                room.add(peer)
                peer.data.roomId = roomId
                peer.data.userName = userName

                for (const client of room) {
                    client.send(JSON.stringify({
                        type: 'userJoined',
                        userName
                    }))
                }

                break
            }
            case 'userMessage': {
                const room = rooms.get(roomId)

                if (!room) {
                    peer.send(JSON.stringify({
                        type: 'error',
                        message: `Room ${roomId} not found`
                    }))
                    return
                }

                room.add(peer)
                peer.data.roomId = roomId
                peer.data.userName = userName

                for (const client of room) {
                    client.send(JSON.stringify({
                        type: 'userMessage',
                        roomId,
                        userName,
                        content,
                    }))
                }

                break
            }
        }
    },
    error(peer, error) {
        peer.send(JSON.stringify({
            type: 'error',
            error: error
        }))
    },
    close(peer) {
        console.log(`[WS] SERVER closed: ${peer.id}`)
        const roomId = peer?.data?.roomId
        if (!roomId) return

        const room = rooms.get(roomId)
        if (!room) return

        room.delete(peer)
        if (room.size === 0) {
            rooms.delete(roomId)
        }
    }
})
