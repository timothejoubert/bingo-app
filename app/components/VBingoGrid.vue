<script lang="ts" setup>
import type { BingoGame } from '~/types/bingo';

const props = defineProps<{
    game: BingoGame
}>()

const { pickNumbers } = useBingoGame(props.game.id)

const lastPicked = computed(() => {
    return pickNumbers.value[pickNumbers.value.length - 1] || null
})

const displayedNumbers = computed(() => {
    if (props.game?.grid) return props.game.grid
    return [...Array(99).keys()].map(nb => nb + 1)
})
</script>

<template>
    <VBingoGridUi
        :grid="displayedNumbers"
        :selected-indicator="lastPicked"
        :active-indicators="pickNumbers"
        :loading="!game"
    />
</template>
