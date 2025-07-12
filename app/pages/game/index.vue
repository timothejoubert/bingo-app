<script lang="ts" setup>
definePageMeta({
    name: 'game_list',
})

const title = computed(() => 'Votre historique de parties')

usePage({
    data: {
        title: title.value,
    },
})
</script>

<template>
    <div :class="$style.root">
        <h1>
            {{ title }}
        </h1>
        <VHistoryList />
    </div>
</template>

<style lang="scss" module>
.root {
    // background-color: lightgrey;
}
</style>
