export type BingoStatus = 'started' | 'finished'

export type BingoOptions = {
    gridStart: number
    gridEnd: number
    manualMode: boolean
}

type User = {
    id: string
    type: 'host' | 'player'
    name?: string
}

type RoundHistoryData = {
    [key: string]: unknown
    value?: string | number
    message?: string
}

type RoundHistory = {
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
type KeyArr<T> = readonly (keyof T)[];

export type BingoGameKeys = KeyArr<BingoGame>
