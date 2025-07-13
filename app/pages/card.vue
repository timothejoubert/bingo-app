<script lang="ts" setup>
import { generateBingoCardGrid, type BingoCardGrid } from '~/utils/generate-bingo-card'

definePageMeta({
    name: 'card',
})


const cards = ref<{ id: number, item: BingoCardGrid}[]>([])

function addBingoCard() {
    const card = generateBingoCardGrid()
    cards.value.unshift({ id:cards.value.length, item: card})
}

const title = computed(() => 'Générer vos cartons')
usePage({
    data: {
        title: title.value,
    },
})
</script>

<template>
    <div>
        <VSection title="Nouveau carton">
            <UButton
                label="Générer un carton"
                @click="addBingoCard"
                class="block mx-auto"
            />
        </VSection>
        <VSection title="Vos cartons générés">
            <UButton
                v-if="!cards.length"
                label="Générer votre premier carton"
                variant="subtle"
                @click="addBingoCard"
                class="block mx-auto mt-15 mb-10"
            />
            <template
                v-for="card in cards"
                :key="'card' + card.id"
            >
                <div class="mt-6">
                    <div class="mb-3">#{{ card.id }}</div>
                    <VBingoCardGrid
                        :card="card.item"
                    />
                </div>
            </template>
        </VSection>
    </div>
</template>

<style lang="scss" module>
</style>
