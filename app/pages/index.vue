<script lang="ts" setup>
definePageMeta({
    name: 'home',
})

const title = computed(() => 'Votre jeu de Bingo français en ligne')

usePage({
    data: {
        title: title.value,
    },
})
</script>

<template>
    <div>
        <VSection title="Nouvelle partie">
            <VCreateGameButton />
        </VSection>
        <VSection title="Historique de vos parties">
            <VHistoryList />
        </VSection>
    </div>
</template>
