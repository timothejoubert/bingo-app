<script lang="ts" setup>
import type { BingoGame } from '~/types/bingo';

const props = defineProps<{
    game: BingoGame | undefined
}>()

const lastPicked = computed(() => {
    const list = props.game?.pickNumbers
    if (!list) return

    return list[list.length - 1]
})

const displayedNumbers = computed(() => {
    if (props.game?.grid) return props.game.grid
    return [...Array(99).keys()].map(nb => nb + 1)
})
</script>

<template>
    <div :class="$style.root" v-if="game">
        <div
            v-for="item in displayedNumbers"
            :key="'cell-' + item"
            :class="[
                $style.cell,
                game.pickNumbers?.includes(item) && $style['cell--active'],
                item === lastPicked && $style['cell--current']
            ]"
        >
            {{ item }}
        </div>
    </div>
    <div :class="$style.root" v-else>
        <USkeleton
            v-for="item in displayedNumbers"
            :key="'skeleton-cell-' + item"
            :class="$style.cell"
        />
    </div>
</template>

<style lang="scss" module>
.root {
    display: grid;
    grid-template-columns: repeat(9, minmax(0, 1fr));
}

.cell {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--ui-border);
    aspect-ratio: 1;
    color: var(--ui-text-muted);

    &::before {
        position: absolute;
        content: '';
        inset: 10px;
        border-radius: 50vmax;
        z-index: -1;
    }

    &--active {
        color: var(--ui-text-inverted);

        &::before {
            background-color: var(--ui-color-primary-400);
        }
    }

    &--current {
        color: var(--ui-text-inverted);

        &::before {
            background-color: var(--ui-color-primary-50);
        }
    }
}
</style>
