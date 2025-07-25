export type BingoStatus = 'started' | 'finished'

export type BingoOptions = {
    gridStart: number
    gridEnd: number
    manualMode: boolean
}

export type User = {
    id: string
    type: 'host' | 'player'
    name?: string
}

export type RoundHistoryData = {
    [key: string]: unknown
    value?: string | number
    message?: string
}

export type RoundHistory = {
    type: 'statusUpdated' | 'rollNumber' | 'userAction'
    user?: User
    data?: RoundHistoryData
    timestamp: number
}

export type BingoGame = {
    id: string
    startDate: string
    endDate: null | string
    options: BingoOptions
    roundHistory: RoundHistory[]
    grid: number[]
    status: BingoStatus
}
