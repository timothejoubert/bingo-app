export function useBingoGameMutation(id: MaybeRefOrGetter<string>) {
    const history = useBingoGameHistory()

    const currentGame = computed(() => {
        const game = history.value.find(game => game.id === toValue(id))

        if (!game) {
            throw createError({ statusCode: 500, message: 'can\'t find game from id' })
        }

        return game
    })

    return { currentGame }
}