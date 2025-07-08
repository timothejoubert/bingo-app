<script setup lang="ts">
const { color = '#000' } = defineProps<{
    color?: string
}>()

const $style = useCssModule()
const { isLoading } = useLoadingIndicator()

watch(isLoading, () => {
    if (isLoading.value) {
        document.body.classList.add($style.loading)
    }
    else {
        document.body.classList.remove($style.loading)
    }
})
</script>

<template>
    <NuxtLoadingIndicator :height="4" :color="color" />
</template>

<style lang="scss" module>
.loading,
.loading a,
.loading button {
    cursor: wait !important;
}
</style>
