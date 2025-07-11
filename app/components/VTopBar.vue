<template>
    <nav :class="$style.root">
        <a href="/">Home</a>
        <a href="/game">Historique</a>
    </nav>
</template>
<style lang="scss" module>
.root {
    display: flex;
    justify-content: center;
    gap: 32px;
    padding-block: 16px;
}
</style>