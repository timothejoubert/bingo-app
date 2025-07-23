import type { BingoOptions, RoundHistory } from "~/types/bingo"
import { roundHistoryStatus, roundHistoryDataValue } from '~/constants/bingo'

export function getHostUser() {
    return {
        type: 'host' as const,
        id: 'host_id',
    }
}

export function getPlayerUser() {
    return {
        type: 'player' as const,
        id: 'player_id',
    }
}

export function useBingoGame(gameId: MaybeRef<string>) {
    const history = useBingoGameList()

    const currentGame = computed(() => history.value?.find(game => game.id === toValue(gameId)))

    const gameGrid = computed(() => currentGame.value?.grid || [])
    const gameHistory = computed(() => currentGame.value?.roundHistory || [])

    const pickNumbers = computed(() => getPickNumbers(gameHistory.value))
    const restNumbers = computed(() => getRestNumbers(gameGrid.value, pickNumbers.value))

    const isFinished = computed(() => currentGame.value?.status === roundHistoryStatus.FINISHED)


    // STATUS ACTIONS
    function createNewGame(options: BingoOptions) {
        const gameData = getBingoGame(toValue(gameId), options)

        if(!history.value) {
            history.value = [gameData]
        } else {
            history.value.push(gameData)
        }

        return gameId
    }

    function deleteGame() {
        const gameIndex = history.value?.findIndex(game => game.id === gameId)

        if (!gameIndex || gameIndex === -1) {
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
    function rollNumber(number: number, message?: string) {
        if (!restNumbers.value.includes(number)) {
            return {
                error: `Le nombre ${number} n\'est pas disponnible`
            }
        }

        pushRoundHistory({
            type: 'rollNumber',
            user: getHostUser(),
            data: {
                value: number,
                message: message || 'Numéro manuel',
            }
        })

        if (!restNumbers.value.length) {
            finishGame()
        }

        return { value: number }
    }

    function rollRandomNumber() {
        const number = getRandomItemFromList(restNumbers.value)

        rollNumber(number, 'Numéro aléatoire')
    }

    function pushRoundHistory(value: Omit<RoundHistory, 'timestamp'>) {
        if (!currentGame.value) {
            console.error('can\'t pushRoundHistory because game can\'t be find')
            return
        }

        const history = {
            ...value,
            timestamp: new Date().getTime()
        } as RoundHistory

        currentGame.value.roundHistory.push(history)
        return history
    }

    return {
        currentGame,
        pickNumbers,
        restNumbers,
        gameHistory,
        isFinished,
        rollNumber,
        rollRandomNumber,
        pushRoundHistory,
        createNewGame,
        deleteGame,
        finishGame,
    }
}
