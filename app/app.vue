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
        console.log('set history state from localStorage')
    }
})

// TODO: perf
// update localStorageHistory only when user leave window or change route
watch(history, (v) => {
    localStorageHistory.value = v
    console.log('set localStorage from history')
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
