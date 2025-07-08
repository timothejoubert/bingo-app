<script lang="ts" setup>
const title = 'Page d\'accueil'
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