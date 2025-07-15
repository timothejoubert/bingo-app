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

const title = computed(() => 'Générez vos cartons')
usePage({
    data: {
        title: title.value,
    },
})
</script>

<template>
    <div>
        <VSection title="Nouveau carton" v-slot="{ spacingStyle }">
            <div :class="spacingStyle">
                <UButton
                    label="Générer un carton"
                    @click="addBingoCard"
                    class="block mx-auto"
                />
            </div>
        </VSection>
        <VSection
            v-slot="{ spacingStyle }"
            title="Vos cartons générés"
        >
            <div :class="spacingStyle" v-if="!cards.length">
                <UButton
                    label="Générer votre premier carton"
                    variant="subtle"
                    @click="addBingoCard"
                    class="block mx-auto mt-15 mb-10"
                />
            </div>
            <template
                v-for="card in cards"
                :key="'card' + card.id"
            >
                <div class="mt-6" :class="spacingStyle">
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
