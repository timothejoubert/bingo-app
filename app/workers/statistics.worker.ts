export type GamesStatistics = {
    numbers: number[]
    games: number[][]
    scores: Record<number, number>
    occurrences: Record<number, number>
    indexSums: Record<number, number>
}

export type LoadStatisticsOptions = {
    start: number
    end: number
    gameIteration: number
    roundIteration: number
}

function runGame(index: number, gridStart: number, gridEnd: number, roundIteration: number) {
    const id = (index + 1).toString()
    const game = getBingoGame(id, { gridStart, gridEnd, manualMode: false })

    const restNumbers = [...game.grid]
    const numbers = []

    for (let i = 0; i < roundIteration; i++) {
        const pickNumber = getRandomItemFromList(restNumbers)
        numbers.push(pickNumber)

        const indexToRemove = restNumbers.findIndex(nb => nb === pickNumber)
        restNumbers.splice(indexToRemove, 1)
    }

    return numbers
}

const getDefaultNumberObj = (numbers: number[]) => numbers.reduce((acc, nb) => Object.assign(acc, {[nb]: 0 }), {} as Record<number, number>)

export function loadStatistics(options: LoadStatisticsOptions) {
    let gameIndex = 0

    const numbers = getGridNumbers(options.start, options.end)
    const stats: GamesStatistics = {
        numbers,
        games: [],
        indexSums: getDefaultNumberObj(numbers),
        scores: getDefaultNumberObj(numbers),
        occurrences: getDefaultNumberObj(numbers),
    }

    // Game iteration
    for (let i = 0; i < options.gameIteration; i++) {
        const gameNumbers = runGame(gameIndex, options.start, options.end, options.roundIteration)
        stats.games.push(gameNumbers)

        gameNumbers.forEach((number, index) => {
            stats.indexSums[number] = (stats.indexSums[number] ?? 0) + index
            stats.occurrences[number] = (stats.occurrences[number] ?? 0) + 1
        })

        gameIndex++
    }

    const maxIndex = stats.games[0]?.length ? stats.games[0].length - 1 : 1

    for (const number in stats.indexSums) {
        const occ = stats.occurrences[number] ?? 0
        if (occ === 0) continue // éviter division par zéro

        const freq = occ / options.gameIteration // entre 0 et 1
        const avgIndex = stats.indexSums[number]! / occ
        const positionScore = 1 - avgIndex / maxIndex // entre 0 et 1
        const finalScore = (0.5 * freq + 0.5 * positionScore) * 100
        stats.scores[+number] = +finalScore.toFixed(3)
    }

    return stats
}

self.onmessage = (event: MessageEvent<LoadStatisticsOptions>) => {
    const result = loadStatistics(event.data)

    self.postMessage(result)
}
