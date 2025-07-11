<script lang="ts" setup>
import type { BingoGame } from './types/bingo'
import { useStorage, StorageSerializers } from '@vueuse/core'

const history = useBingoGameHistory()
const localStorageHistory = useStorage<BingoGame[] | null>('bingo-app-history', null, undefined, {
  serializer: StorageSerializers.object,
})

onMounted(() => {
    if (localStorageHistory.value) {
        history.value = localStorageHistory.value
    }
})
console.log('stored history', localStorageHistory.value)

watch(history, (v) => {
    localStorageHistory.value = v
    console.log('watch history', localStorageHistory.value)
}, { deep: true })
</script>

<template>
    <UApp>
        <VLoadingIndicator />
        <NuxtRouteAnnouncer />
        <VTopBar />
        <NuxtPage />
        <VFooter />
    </UApp>
</template>