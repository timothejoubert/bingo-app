<script lang="ts" setup>
const title = 'Create a new bingo'
const webResponse = {
    data: {
        title
    }
}

usePage(webResponse)
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