<template>
    <nav :class="$style.root">
        <NuxtLink href="/">Home</NuxtLink>
        <NuxtLink href="/game">Historique</NuxtLink>
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
