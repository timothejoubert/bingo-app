<template>
    <nav :class="$style.root">
        <NuxtLink
            :to="{ name: 'home' }"
            :class="$style.link"
        >
            Home
        </NuxtLink>
        <NuxtLink
            :to="{ name: 'game_list' }"
            :class="$style.link"
        >
            Historique
        </NuxtLink>
        <NuxtLink
            :to="{ name: 'card-generator' }"
            :class="$style.link"
        >
            Cartons
        </NuxtLink>
        <NuxtLink
            :to="{ name: 'statistic' }"
            :class="$style.link"
        >
            Statistique
        </NuxtLink>
        <NuxtLink
            :to="{ name: 'room' }"
            :class="$style.link"
        >
            Partie online
        </NuxtLink>
    </nav>
</template>

<style lang="scss" module>
.root {
    display: flex;
    justify-content: center;
    gap: 32px;
    padding-block: 16px;
}

.link {
    &:global(.router-link-active) {
        text-decoration: underline;
        text-decoration-color: var(--ui-border-accented);
        text-underline-offset: 3px;
    }
}
</style>
