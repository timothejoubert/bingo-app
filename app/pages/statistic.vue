<script lang="ts" setup>
definePageMeta({
    name: 'statistic',
})

type Heatmap = Record<number, number[]>

const modalOpened = ref(false)

const startValue = ref(1)
const endValue = ref(89)
const iteration = ref(10)

const gamesStats = shallowRef<number[][] | null>(null)
const heatmapStats = shallowRef<Heatmap | null>(null)
const weightScores = shallowRef<Record<number, number> | null>(null)
const grid = shallowRef<number[]>([])

function runGame(index: number, gridStart: number, gridEnd: number) {
    const id = (index + 1).toString()
    const game = getBingoGame(id, { gridStart, gridEnd, manualMode: false })
    const restNumbers = [...game.grid]

    const pickOrder = []
    for (let i = 0; i < game.grid.length; i++) {
        const pickNumber = getRandomItemFromList(restNumbers)
        const indexToRemove = restNumbers.findIndex(nb => nb === pickNumber)
        pickOrder.push(indexToRemove)
        restNumbers.splice(indexToRemove, 1)
    }

    return pickOrder
}

let gameIndex = 0
function loadStatistics() {
    modalOpened.value = false
    const result = []
    const heatmap: Heatmap = {}

    // Init heatmap
    for (let n = startValue.value; n <= endValue.value; n++) {
        heatmap[n] = new Array(endValue.value - startValue.value + 1).fill(0)
    }

    // Simuler plusieurs parties
    for (let i = 0; i < iteration.value; i++) {
        const pickOrder = runGame(gameIndex, startValue.value, endValue.value)
        result.push(pickOrder)

        // Alimenter la heatmap : numéro => position d'apparition
        pickOrder.forEach((number, index) => {
            if (!heatmap[number]) {
                // Crée un tableau vide avec la longueur max (nb total de positions)
                heatmap[number] = new Array(endValue.value - startValue.value + 1).fill(0)
            }

            heatmap[number][index] += 1
        })

        gameIndex++
    }

    grid.value = Object.keys(heatmap).map(k => parseInt(k))
    gamesStats.value = result
    heatmapStats.value = heatmap
    weightScores.value = computeWeightedScores(heatmap, iteration.value)
}

function computeWeightedScores(heatmap: Heatmap, totalGames: number): Record<number, number> {
    const weightedScores: Record<number, number> = {}
    const positionCount = Object.values(heatmap)[0].length

    const maxWeight = positionCount // ex: 89
    const weights = Array.from({ length: positionCount }, (_, i) => maxWeight - i) // [89, 88, 87, ..., 1]

    for (const number in heatmap) {
        const counts = heatmap[number]
        const weightedSum = counts.reduce((acc, count, index) => {
            return acc + count * weights[index]
        }, 0)

        // Max score possible pour ce numéro = totalGames * maxWeight
        const maxScore = totalGames * maxWeight
        const normalizedScore = (weightedSum / maxScore) * 100

        weightedScores[+number] = +normalizedScore.toFixed(2)
    }

    return weightedScores
}

const title = computed(() => 'Stastique du bingo')
usePage({
    data: {
        title: title.value,
    },
})
</script>

<template>
    <div>
        <UModal
            v-model:open="modalOpened"
            title="Votre partie est terminée"
            description="Partie terminée, choisisez une action"
        >
            <template
                #body
            >
                <UFormField
                    label="Numéro de début"
                >
                    <UInputNumber v-model="startValue" />
                </UFormField>
                <UFormField
                    label="Numéro de fin"
                >
                    <UInputNumber v-model="endValue" />
                </UFormField>
                <UFormField
                    label="Itération"
                >
                    <UInputNumber v-model="iteration" />
                </UFormField>
                <UButton
                    label="Lancer la génération"
                    class="block mx-auto mt-8"
                    @click="loadStatistics"
                />
            </template>
        </UModal>
        <VSection
            v-slot="{ spacingStyle }"
            title="Visualisation des numéros sorties"
        >
            <div :class="spacingStyle">
                <p :class="$style.paragraph">
                    Cette page permet de visualiser la répartition aléatoire des nombres sorties lors d'un grand nombre de parties.
                </p>
                <UButton
                    label="Lancer la génération"
                    class="block mx-auto mt-8"
                    @click="() => {modalOpened = true}"
                />
            </div>
        </VSection>
        <VSection
            v-slot="{ spacingStyle }"
            title="Résultats"
        >
            <div :class="spacingStyle">
                <VBingoGridUi :grid="grid" v-slot="{number}">
                    <span :class="$style['bg-score']" :style="{height: weightScores?.[number] + '%'}"/>
                </VBingoGridUi>
                <pre>{{ heatmapStats }}</pre>
            </div>
        </VSection>
    </div>
</template>

<style lang="scss" module>
.paragraph {
    max-width: 60ch;
    margin-inline: auto;
}

.bg-score {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--ui-bg-accented);
    z-index: -1;
}
</style>
