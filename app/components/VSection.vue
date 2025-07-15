<script lang="ts" setup>
defineProps<{
    title?: string
}>()
</script>

<template>
    <section :class="$style.root">
        <h2 v-if="title" class="text-lg" :class="$style.title">
            {{ title }}
            <VPlaceholder :class="$style.placeholder" />
        </h2>
        <slot :spacing-style="$style.content" />
    </section>
</template>

<style lang="scss" module>
.root {
    max-width: min(calc(100% - 16px * 2), 1000px);
    margin-inline: auto;
    border: 1px solid var(--ui-border);
    border-radius: 8px;
    margin-block: 72px;
}

.title {
    position: relative;
    width: 100%;
    border-bottom: 1PX solid var(--ui-border);
    padding: var(--v-section-content-padding-block, 14px) var(--v-section-content-padding-inline, 20px);
}

.placeholder {
    position: absolute;
    inset: 0px;
    z-index: -1;
    pointer-events: none;
}

.content {
    padding: var(--v-section-content-padding-block, 20px) var(--v-section-content-padding-inline, 18px);
}
</style>
