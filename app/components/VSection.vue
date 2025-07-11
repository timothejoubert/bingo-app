<template>
    <section :class="$style.root">
        <slot></slot>
    </section>
</template>
<style lang="scss" module>
.root {
    max-width: min(calc(100% - 16px * 2), 1200px);
    margin-inline: auto;
    border: 1px solid #c7c7c7;
    border-radius: 12px;
    padding: 18px 52px;
    margin-block: 100px;
}
</style>