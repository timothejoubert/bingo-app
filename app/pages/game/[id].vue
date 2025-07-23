<script lang="ts" setup>
import type { TimelineItem } from '@nuxt/ui'

definePageMeta({
    name: 'game',
    validate: (route) => {
        return typeof route.params.id === 'string'
    },
})

// Bingo features
const route = useRoute('game')
const gameId = computed(() => {
    const id = route.params.id
    return (Array.isArray(id) ? id[0] : id) as string
})

const { currentGame, gameHistory, isFinished, rollRandomNumber, rollNumber } = useBingoGame(gameId.value)

// Game state
const displayFinishedModal = ref(false)
watch(isFinished, () => {
    displayFinishedModal.value = true
})

// Game history
const formatDate = (date: Date) => date.toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit',hour12: false})
const timelineItemList = computed(() => {
    const items = gameHistory.value.map((roundHistory, i) => {

    const title = roundHistory.type === 'statusUpdated'
        ? 'Informatiom de partie'
        : roundHistory.type === 'rollNumber'
            ? `Nouveau numéro: ${roundHistory.data?.value}`
            : roundHistory.type === 'userAction'
                ? 'Action d\'un joueur'
                : ''


    return {
            title,
            icon: 'i-lucide-rocket',
            value: i,
            description: roundHistory.data?.message,
            date: formatDate(new Date(roundHistory.timestamp)),
        } as TimelineItem
    })

    return items.reverse()
})
const currentRound = computed(() => timelineItemList.value.length)


// Next number
function onNextNumberClicked(_event: Event) {
    rollRandomNumber()
}

const manuelInputError = ref('')
function onManualInput(event: Event) {
    manuelInputError.value = ''

    const target = event.target as HTMLInputElement
    const value = parseInt(target?.value)
    if (typeof value !== 'number') return

    const response = rollNumber(value)

    if (response?.error) {
        manuelInputError.value = response.error
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
            title="Votre partie est terminée"
            description="Partie terminée, choisisez une action"
        >
            <template
                #body
            >
                <UButton
                    label="Retour à l'acceuil"
                    color="neutral"
                    variant="subtle"
                    @click="navigateTo({ name: 'home' })"
                />
                <VCreateGameButton button-label="Relancer une partie" />
            </template>
        </UModal>
        <VSection :title="title">
            <div :class="$style.body">
                <div :class="$style.main">
                    <VBingoGrid
                        v-if="currentGame"
                        :game="currentGame"
                    />
                </div>
                <aside :class="$style.aside">
                    <div :class="$style.aside__title" class="text-lg">Historique de la partie: <strong>{{ currentRound }}</strong></div>
                    <div :class="$style['history-aside']">
                        <UTimeline
                            :default-value="0"
                            :items="timelineItemList"
                        />
                    </div>
                </aside>
                <div :class="$style.controls">
                    <VPlaceholder :class="$style.placeholder" />
                    <UButton
                        :disabled="isFinished"
                        label="Tirer un numéro"
                        :color="isFinished ? 'neutral' : undefined"
                        @click="onNextNumberClicked"
                    />
                    <UFormField v-show="currentGame?.options.manualMode" label="Choisir le prochain numéro" :error="manuelInputError">
                        <UInput @change="onManualInput" @blur="manuelInputError = ''" type="number" />
                    </UFormField>
                </div>
            </div>
        </VSection>
    </div>
</template>

<style lang="scss" module>
.root {
    margin-block: 100px;
}

.body {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
        "main"
        "controls"
        "aside";

    margin-inline: auto;
    align-items: flex-start;
    margin-inline: auto;
    min-height: 60vh;

    @include media('>=md') {
        grid-template-columns: 1fr 300px;
        grid-template-rows: 1fr auto;
        grid-template-areas:
            "main aside"
            "controls aside";
    }
}

.main {
    grid-area: main;
    align-self: center;
    margin: 20px;
}

.aside {
    grid-area: aside;
    position: relative;
    overflow: clip auto;
    height: 100%;
    width: 100%;
    min-height: 50vh;
    padding-left: 20px;
    border-left: 1PX solid var(--ui-border);

    &::before {
        position: absolute;
        pointer-events: none;
        content: '';
        inset: 0;
        border-radius: 4px;
    }
}

.aside__title {
    position: sticky;
    top: 0;
    padding-top: 20px;
    padding-bottom: 12px;
    background-color: var(--ui-bg);
}

.history-aside {
    position: absolute;
    z-index: -1;
    width: 100%;
}

.controls {
    position: sticky;
    bottom: 20px;
    background-color: var(--ui-bg);
    grid-area: controls;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: flex-end;
    border-top: 1PX solid var(--ui-border);
    border-bottom: 1PX solid var(--ui-border);

    @include media('>=md') {
        position: relative;
        bottom: unset;
        border-bottom: none;
    }
}

.placeholder {
    position: absolute;
    inset: 0;
    pointer-events: none;
}
</style>
