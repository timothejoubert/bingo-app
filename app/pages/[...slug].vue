<script lang="ts" setup>
const title = 'Wildcard page'
const webResponse = {
    data: {
        title
    }
}

usePage(webResponse)
</script>

<template>
    <div>{{ title }}</div>
</template>