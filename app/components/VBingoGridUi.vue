<script lang="ts" setup>
defineProps<{
    grid: number[]
    activeIndicators?: number[]
    selectedIndicator?: number | null
    loading?: boolean
}>()
</script>

<template>
    <div :class="[$style.root, loading && $style['root-loading']]">
        <div
            v-for="number in grid"
            :key="'cell-' + number"
            :class="$style.cell"
        >
            <USkeleton
                v-if="loading"
                :class="$style.cell"
            />
            <template v-else>
                {{ number }}
                <slot :number="number">
                    <div
                        v-if="activeIndicators?.includes(number)"
                        :class="[
                            $style['active-indicator'],
                            selectedIndicator === number && $style['active-indicator--selected']
                        ]"
                    ></div>
                </slot>
            </template>

        </div>
    </div>
</template>

<style lang="scss" module>
.root {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));

    @include media('>=sm') {
        grid-template-columns: repeat(10, minmax(0, 1fr));
    }
}

.cell {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--ui-border);
    aspect-ratio: 1;
    color: var(--ui-text-muted);

    &:has(.active-indicator) {
        color: var(--ui-text-highlighted);
    }

    &:has(.active-indicator--selected) {
        color: var(--ui-text-inverted);
    }
}

.active-indicator {
    position: absolute;
    inset: 10px;
    border-radius: 50vmax;
    z-index: -1;
    background-color: var(--ui-bg-accented);

    &--selected {
        background-color: var(--ui-color-primary-400);
    }
}
</style>
