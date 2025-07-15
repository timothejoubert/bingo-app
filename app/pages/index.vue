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
        <VSection
            v-slot="{ spacingStyle }"
            title="Création d'une nouvelle partie"
        >
            <VCreateGameButton :class="spacingStyle" />
        </VSection>
        <VSection
            v-slot="{ spacingStyle }"
            title="Historique de vos parties"
        >
            <VHistoryList :class="spacingStyle" />
        </VSection>
    </div>
</template>
