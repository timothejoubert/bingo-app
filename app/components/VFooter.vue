<script setup lang="ts">
const year = (new Date()).getFullYear()
</script>

<template>
    <footer :class="$style.root">
        <div>{{ year }}</div>
        <a
            href="https://timothejoubert.com/"
            target="_blank"
            class="text-sm"
        >
            Créer par Tim
        </a>
    </footer>
</template>

<style lang="scss" module>
.root {
    display: flex;
    justify-content: space-between;
    padding-block: 16px;
    border-top: 1px solid var(--ui-border);
    width: calc(100% - 22px * 2);
    margin-inline: auto;
    color: var(--ui-text-dimmed);
}
</style>
