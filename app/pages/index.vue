<script lang="ts" setup>
definePageMeta({
  name: 'home',
})

const title = computed(() => 'Page d\'accueil')

usePage({
    data: {
        title: title.value
    }
})

</script>

<template>
    <div :class="$style.root">
        <header>
            <h1>
                {{ title }}
            </h1>
        </header>
        <div :class="$style.section">
            <h2 class="text-4xl">Nouvelle Partie</h2>
            <VCreateGameButton />
        </div>
        <VSection :class="$style.section">
            <h2 class="text-4xl">Historique</h2>
            <VHistoryList />
        </VSection>
    </div>
</template>

<style lang="scss" module>
.root {
    // background-color: lightgrey;
}
</style>