<script lang="ts" setup>
defineProps<{
    title?: string
}>()
</script>

<template>
    <section :class="$style.root">
        <template v-if="title">
            <h2 class="text-lg my-3 w-full">{{ title }}</h2>
            <USeparator :class="$style.separator" class="mb-5" />
        </template>
        <slot />
    </section>
</template>

<style lang="scss" module>
.root {
    --v-section-padding-inline: 18px;

    max-width: min(calc(100% - 16px * 2), 1000px);
    margin-inline: auto;
    border: 1px solid var(--ui-border);
    border-radius: 8px;
    padding-inline: var(--v-section-padding-inline);
    padding-bottom: 22px;
    margin-block: 72px;
}

.separator {
    margin-left: calc(var(--v-section-padding-inline) * -1);
    width: calc(100% + var(--v-section-padding-inline) * 2)
}
</style>
