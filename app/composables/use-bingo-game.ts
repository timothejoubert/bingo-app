import type { BingoOptions } from "~/types/bingo"

export function useBingoGame() {
    const history = useBingoGameHistory()


    function getGame(gameId: string) {
        const game = history.value.find(game => game.id === gameId)
        if (!game) {
            throw createError({ statusCode: 500, message: 'can\'t find game from id' })
        }

        return game
    }

    function createNewGame(id: string, options: BingoOptions) {

        const restNumber = Array.from(
            { length: options.gridEnd - options.gridStart + 1 },
            (_, i) => options.gridStart + i
        )
        const game = {
            id,
            startDate: (new Date()).toISOString(),
            endDate: null,
            options,
            storedNumber: [],
            restNumber,
            status: 'started' as const
        }

        history.value.push(game)

        return id
    }

    function rollNewNumber(gameId: string) {
        const game = getGame(gameId)

        if (game.restNumber.length === 0) {
            return null
        }

        const index = Math.floor(Math.random() * game.restNumber.length)
        const number = game.restNumber[index] as number

        game.storedNumber.push(number)
        game.restNumber.splice(index, 1)

        return number
    }

    function finishGame(gameId: string) {
        const game = getGame(gameId)

        game.endDate = new Date()
        game.status = 'finished'
    }

    return { createNewGame, getGame, finishGame, rollNewNumber }
}