<script lang="ts" setup>
definePageMeta({
    name: 'home',
})

const title = computed(() => 'Votre jeu de Bingo français en ligne')

usePage({
    data: {
        title: title.value,
        description: 'Jouer au bingo version française sans création de compte avec un historique de partie.',
    },
})
</script>

<template>
    <div>
        <VSection title="Création d'une nouvelle partie">
            <VCreateGameButton />
        </VSection>
        <VSection title="Historique de vos parties">
            <VHistoryList />
        </VSection>
    </div>
</template>
