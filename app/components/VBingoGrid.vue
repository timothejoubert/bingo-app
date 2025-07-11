<script lang="ts" setup>

const props = defineProps<{
    gameId: string
}>()

const { currentGame } = useBingoGameMutation(() => props.gameId)
</script>

<template>
    <div :class="$style.root">
        <div v-for="item in currentGame.storedNumber" :key="item" :class="$style.cell">{{ item }}</div>
    </div>
</template>

<style lang="scss" module>
.root {
    display: grid;
    grid-template-columns: repeat(9, minmax(0, 1fr));
    width: min(500px, 100%);
    margin-inline: auto;
}

.cell {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    aspect-ratio: 1;
}
</style>