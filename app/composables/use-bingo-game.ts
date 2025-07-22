import type { BingoGame, BingoOptions, RoundHistory } from "~/types/bingo"
import { roundHistoryDataValue, roundHistoryType, roundHistoryStatus } from '~/constants/bingo'
function getHostUser() {
    return {
        type: 'host' as const,
        id: 'host_id',
    }
}

function getPlayerUser() {
    return {
        type: 'player' as const,
        id: 'player_id',
    }
}

export function useBingoGame(gameId: string) {
    const history = useBingoGameHistory()

    const currentGame = computed(() => history.value?.find(game => game.id === gameId))
    const gameHistory = computed(() => currentGame.value?.roundHistory || [])
    const isFinished = computed(() => currentGame.value?.status === roundHistoryStatus.FINISHED)
    const pickNumbers = computed(() => {
        return gameHistory.value
            .filter(history => history.type === 'rollNumber' && history.data?.value && typeof history.data.value === 'number')
            .map(history => (history.data as { value: number}).value)
    })

    const restNumbers = computed(() => {
        return currentGame.value?.grid.filter(n => !pickNumbers.value.includes(n)) || []
    })

    // STATUS ACTIONS
    function createNewGame(options: BingoOptions) {
        const grid = Array.from(
            { length: options.gridEnd - options.gridStart + 1 },
            (_, i) => options.gridStart + i
        )
        const now = new Date()
        const game = {
            id: gameId,
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
            grid,
            status: 'started' as const
        } as BingoGame



        if(!history.value) {
            history.value = [game]
        } else {
            history.value.push(game)
        }

        return gameId
    }

    function deleteGame() {
        if(!history.value?.length) {
            console.error('Game history is empty')
            return
        }

        const gameIndex = history.value.findIndex(game => game.id === gameId)

        if (gameIndex === -1) {
            console.error('cant find game from history for id:', gameId)
            return
        }

        pushRoundHistory({
            type: 'statusUpdated',
            data: {
                value: roundHistoryDataValue.DELETED,
                message: `Partie #${gameId} supprimée`
            }
        })
        history.value?.splice(gameIndex, 1)
    }

    function finishGame() {

        if (currentGame.value) {
            currentGame.value.status = roundHistoryStatus.FINISHED
        }
        pushRoundHistory({
            type: 'statusUpdated',
            user: getHostUser(),
            data: {
                value: roundHistoryDataValue.FINISHED,
                message: `Partie #${gameId} finie`
            }
        })
    }

    // GAME ACTIONS
    function rollNewNumber(manualNumber?: number) {
        const pickNumber = typeof manualNumber === 'number'
            ? manualNumber
            : restNumbers.value[Math.floor(Math.random() * restNumbers.value.length)] as number


        if (!restNumbers.value.includes(pickNumber)) {
            return { error: `Le nombre ${pickNumber} n\'est pas disponnible` }
        }

        pushRoundHistory({
            type: 'rollNumber',
            user: getHostUser(),
            data: {
                value: pickNumber,
                message: typeof manualNumber === 'number' ? 'Numéro manuel' : 'Numéro aléatoire',
            }
        })

        if(!restNumbers.value.length ) {
            finishGame()
        }

        return { value: pickNumber }
    }

    function pushRoundHistory(value: Omit<RoundHistory, 'timestamp'>) {
        const game = currentGame.value
        if (!game) {
            console.error('can\'t pushRoundHistory because game can\'t be find')
            return
        }

        const history = {
            ...value,
            timestamp: new Date().getTime()
        }

        game.roundHistory.push(history)
        return history
    }

    return { currentGame, pickNumbers, restNumbers, gameHistory, isFinished, createNewGame, finishGame, rollNewNumber, deleteGame }
}
