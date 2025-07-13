export type BingoStatus = 'started' | 'finished'

export type BingoOptions = {
    gridStart: number
    gridEnd: number
    manuelMode: boolean
}

export type BingoGame = {
    id: string
    startDate: string
    endDate: null | string
    options: BingoOptions
    pickNumbers: number[]
    restNumbers: number[]
    grid: number[]
    status: BingoStatus
}
type KeyArr<T> = readonly (keyof T)[];

export type BingoGameKeys = KeyArr<BingoGame>
