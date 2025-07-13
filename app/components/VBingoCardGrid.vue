<script lang="ts" setup>
import type { BingoCardGrid } from '~/utils/generate-bingo-card'

defineProps<{
    card: BingoCardGrid
}>()

</script>

<template>
    <div :class="$style.root">
        <div
            v-for="(row, rowIndex) in card"
            :key="'row' + rowIndex"
            :class="[ $style.row ]"
        >
            <div
                v-for="(column, columnIndex) in row"
                :key="'row' + rowIndex + 'column' + columnIndex + (column || 'empty')"
                :class="[$style.column]"
            >
                {{ column }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.root {
    display: flex;
    flex-direction: column;

}

.row {
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));

}

.column {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--ui-border);
    aspect-ratio: 1;
}
</style>
