<script setup lang="ts">
const DEFAULT_PREFIX = 'icon'

defineProps({
    name: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
    },
})
</script>

<template>
    <NuxtIcon
        :name="(prefix || DEFAULT_PREFIX) + ':' + name"
    />
</template>
