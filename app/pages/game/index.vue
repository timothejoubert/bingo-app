<script lang="ts" setup>
definePageMeta({
    name: 'game_list',
})

const title = computed(() => 'Historique de vos parties')

usePage({
    data: {
        title: title.value,
    },
})
</script>

<template>
    <div>
        <VSection :title="title">
            <VHistoryList />
        </VSection>
    </div>
</template>
