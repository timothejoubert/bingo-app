import type { BingoGame, BingoOptions } from "~/types/bingo"

export function useBingoGame() {
    const history = useBingoGameHistory()


    function getGame(gameId: string) {
        const game = history.value?.find(game => game.id === gameId)

        if (!game) {
            console.error('cant find game from id', gameId)
        }
        return game
    }

    function deleteGame(id: string) {
        if(!history.value || !history.value.length) {
            console.error('Game history is empty')
            return
        }

        const index = history.value.findIndex(game => game.id === id) || -1

        if (index === -1) {
            console.error('cant find game from history for id:', id)
            return
        }

        history.value?.splice(index, 1)
    }

    function createNewGame(id: string, options: BingoOptions) {

        const grid = Array.from(
            { length: options.gridEnd - options.gridStart + 1 },
            (_, i) => options.gridStart + i
        )
        const game = {
            id,
            startDate: (new Date()).toISOString(),
            endDate: null,
            options,
            pickNumbers: [] as number[],
            restNumbers: [...grid],
            grid,
            status: 'started' as const
        } as BingoGame

        if(!history.value) {
            history.value = [game]
        } else {
            history.value.push(game)
        }

        return id
    }

    function pickNumber(gameId: string, number: number) {
        const game = getGame(gameId)
        if (!game) return null
        if (game.status === 'finished') return null

        const index = game.restNumbers?.findIndex((nb) => nb === number)
        if (index === -1) {
            return { error: `Le numbre ${number} n\'est pas disponnible` }
        }

        game.pickNumbers.push(number)
        game.restNumbers.splice(index, 1)

        if (game.restNumbers.length === 0) {
            console.log('All numbers are picked')
            finishGame(gameId)
        }
    }

    function rollNewNumber(gameId: string) {
        const game = getGame(gameId)
        if (!game) return null
        if (game.status === 'finished') return null

        const index = Math.floor(Math.random() * game.restNumbers.length)
        const pickNumber = game.restNumbers[index] as number

        game.pickNumbers.push(pickNumber)
        game.restNumbers.splice(index, 1)

        if (game.restNumbers.length === 0) {
            console.log('All numbers are picked')
            finishGame(gameId)
        }

        return pickNumber
    }

    function finishGame(gameId: string) {
        const game = getGame(gameId)
        if(!game) return

        game.endDate = (new Date()).toISOString(),
        game.status = 'finished'
    }

    return { createNewGame, getGame, finishGame, rollNewNumber, deleteGame, pickNumber }
}
