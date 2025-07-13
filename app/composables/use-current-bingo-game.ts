export function useCurrentBingoGame() {
    const route = useRoute()
    const gameId = computed(() => {
        const id = route.params.id
        return Array.isArray(id) ? id[0] : id
    })

    const history = useBingoGameHistory()
    const currentGame = computed(() => {
        if (!gameId.value) return
        return history.value?.find(game => game.id == gameId.value)
    })

    const isFinished = computed(() => currentGame.value?.status === 'finished')

    return { currentGame, gameId, isFinished }
}
