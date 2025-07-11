<script lang="ts" setup>

definePageMeta({
  name: 'game',
  validate: (route) => {
    return typeof route.params.id === 'string'
  }
})

const route = useRoute()
const gameId = computed(() => route.params.id as string)

if (!gameId.value) {
    navigateTo({ name: 'home'})
}

const title = computed(() => `Game ${gameId}`)
usePage({
    data: {
        title: title.value,
    }
})
</script>

<template>
    <div :class="$style.root">
        <h1>Game {{ gameId }}</h1>
        <VBingoGrid v-if="gameId" :gameId="gameId"/>
    </div>
</template>

<style lang="scss" module>
.root {
    background-color: lightgrey;
}
</style>