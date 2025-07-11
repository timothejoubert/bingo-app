
<script lang="ts" setup>
defineProps<{
    cellNode: string
    cell: {key: string, value: string }[]
}>()
</script>

<template>
    <tr :class="$style.row">
        <component 
            :is="cellNode || 'td'"
            v-for="(value, key) in cell" 
            :key="key" 
            :class="$style.cell"
        >
            {{ value }}
        </component>
    </tr>
</template>

<style lang="scss" module>
.row {

}
.cell {

}
</style>