import type { BingoGame, BingoOptions, RoundHistory } from "~/types/bingo"
import { roundHistoryDataValue, roundHistoryType, roundHistoryStatus } from '~/constants/bingo'

export function getRandomItemFromList<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)] as T
}

export function getGridNumbers(start: number, end: number) {
    return  Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
    )
}

export function getBingoGame(id: string, options: BingoOptions) {

    const now = new Date()

    return {
        id,
        startDate: now.toISOString(),
        endDate: null,
        options,
        roundHistory: [{
            type: 'statusUpdated',
            user: getHostUser(),
            timestamp: now.getTime(),
            data: {
                value: roundHistoryDataValue.CREATED,
                message: 'Partie créée',
            }
        }],
        grid: getGridNumbers(options.gridStart, options.gridEnd),
        status: 'started' as const
    } as BingoGame
}


export function getFormattedHistory(value: Omit<RoundHistory, 'timestamp'>) {
    return {
        ...value,
        timestamp: new Date().getTime()
    } as RoundHistory
}


export function getPickNumbers(roundHistory: RoundHistory[]) {
    return roundHistory
        .filter(history => history.type === 'rollNumber' && history.data?.value && typeof history.data.value === 'number')
        .map(history => (history.data as { value: number}).value)
}

export function getRestNumbers(grid: BingoGame['grid'], pickNumbers: number[]) {
    return grid.filter(n => !pickNumbers.includes(n)) || []
}
