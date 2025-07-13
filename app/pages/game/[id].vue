<script lang="ts" setup>
import type { TimelineItem } from '@nuxt/ui'

definePageMeta({
    name: 'game',
    validate: (route) => {
        return typeof route.params.id === 'string'
    },
})


// TODO: store game history on each actions
// on pickNumber, pickManualNumber, userWinRow, useWinCard, gameFinished

// Bingo features
const { currentGame, gameId, isFinished } = useCurrentBingoGame()
const { rollNewNumber, pickNumber } = useBingoGame()


// Game state
const displayFinishedModal = ref(false)
watch(isFinished, (value) => {
    if (value) displayFinishedModal.value = true
})

// Game history
const gameHistory = ref<TimelineItem[]>([])
const currentRound = computed(() => gameHistory.value.length)

const formatTlDate = (date: Date) => {
    return date.toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit',hour12: false})
}

function createTimelineItem(number: number, item?: Omit<TimelineItem, 'date'> & { date?: Date }) {
    return {
        title: `Nombre: ${number}`,
        icon: 'i-lucide-rocket',
        value: number,
        ...(item || {}),
        date: item?.date ? formatTlDate(item.date) : 'unknown date',
    }
}

watch(currentGame, (game) => {
    console.log('watch currentGame', game)
    const list = game?.pickNumbers.map((n) => createTimelineItem(n, { description: 'Entrée pré-enregistrée' }))
    if(!list) return
    list.reverse()

    gameHistory.value.push(...list)
})

function rollNumber() {
    const number = rollNewNumber(gameId.value)
    if (!number) return

    const item = createTimelineItem(number, { date: new Date()})
    gameHistory.value.unshift(item)
}

const manuelInputError = ref('')
function onManuelInput(event: Event) {
    manuelInputError.value = ''

    const target = event.target as HTMLInputElement
    const value = parseInt(target?.value)
    if (typeof value !== 'number') return

    const response = pickNumber(gameId.value, value)
    if (response) {
        manuelInputError.value = response.error
    } else {
        const item = createTimelineItem(value, { date: new Date(), description: 'Entrée manuelle' })
        gameHistory.value.unshift(item)
    }
    target.value = ''
}

// Page Data
const title = computed(() => `Partie #${gameId.value}`)
usePage({
    data: {
        title: title.value,
    },
})
</script>

<template>
    <div :class="$style.root">
        <UModal
            v-model:open="displayFinishedModal"
            title="Bravo votre partie est terminée"
        >
            <template
                #body
            >
                <UButton
                    label="Retour à l'acceuil"
                    color="neutral"
                    variant="subtle"
                />
                <VCreateGameButton button-label="Relancer une partie" />
            </template>
        </UModal>
        <div :class="$style.body">
            <div :class="$style.main">
                <VBingoGrid
                    :game="currentGame"
                />
                <div class="flex gap-x-2 mt-10 items-end justify-between">
                    <UButton
                        :disabled="isFinished"
                        label="Tirer un numéro"
                        variant="subtle"
                        :color="isFinished ? 'neutral' : undefined"
                        @click="rollNumber"
                    />
                    <UFormField v-show="currentGame?.options.manuelMode" label="Choisir le prochain numéro" :error="manuelInputError">
                        <UInput @change="onManuelInput" @blur="manuelInputError = ''" type="number" />
                    </UFormField>
                </div>
            </div>
            <USeparator orientation="vertical" class="h-full" />
            <aside :class="$style.aside">
                <div :class="$style.aside__title" class="text-lg">Historique de la partie: {{ currentRound }}</div>
                <div :class="$style['history-aside']">
                    <UTimeline v-model="currentRound" :items="gameHistory" />
                </div>
            </aside>
        </div>
    </div>
</template>

<style lang="scss" module>
.root {
    margin-block: 100px;
}

.body {
    display: grid;
    grid-template-columns: 1fr auto 260px;
    margin-inline: auto;
    gap: 72px;
    align-items: flex-start;
    margin-inline: auto;
    min-height: 60vh;
    max-width: min(calc(100% - 32px * 2), 900px);
}

.main {
    // width: min(500px, 100%);
    align-self: center;
}

.aside {
    position: relative;
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    padding: 0 8px 20px 8px;

    &::before {
        position: absolute;
        content: '';
        inset: 0;
        border-radius: 4px;
    }
}

.aside__title {
    position: sticky;
    top: 0;
    padding-bottom: 12px;
    background-color: var(--ui-bg);
}

.history-aside {
    position: absolute;
    z-index: -1;
    width: 100%;
}
</style>
