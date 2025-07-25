export type JoinRoomData = {
    userName: undefined | string
    roomId: string
}

export type CreateRoomData = {
    userName: undefined | string
    start: number
    end: number
    manualMode: boolean
}

export type RoomUser = {
    name: string
    color?: string
    isMe?: boolean
}

export type RoomMessage = {
    user?: RoomUser
    content: string
    timestamp: number
}
