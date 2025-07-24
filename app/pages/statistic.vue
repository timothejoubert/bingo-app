<script lang="ts" setup>
import type { Column } from '@tanstack/vue-table'
import type { GamesStatistics, LoadStatisticsOptions } from '~/workers/statistics.worker'
definePageMeta({
    name: 'statistic',
})

const modalOpened = ref(false)

// Statistic options
const startValue = ref(1)
const endValue = ref(89)
const gameIteration = ref(50)
const roundIteration = ref(50)

const generatedStats = shallowRef<GamesStatistics>({
    numbers: [],
    games: [],
    indexSums: {},
    scores: {},
    occurrences: {},
})

let statWorker: Worker | null = null
const isWorkerRunning = ref(false)

function loadStatistics() {
    modalOpened.value = false

    if (!statWorker) {
        statWorker = new Worker(
            new URL('~/workers/statistics.worker.ts', import.meta.url),
            { type: 'module' }
        )
    }

    statWorker.onmessage = (event: MessageEvent<GamesStatistics>) => {
        isWorkerRunning.value = false
        generatedStats.value = event.data
    }

    isWorkerRunning.value = true
    statWorker.postMessage({
        start: startValue.value,
        end: endValue.value,
        gameIteration: gameIteration.value,
        roundIteration: roundIteration.value,
    } satisfies LoadStatisticsOptions)
}

// TABLE UI
const columnKeys = ['number', 'occurrences', 'score', 'averageIndexPosition']
function formatKeyLabel(input: string): string {
    return input.replace(/([A-Z])/g, ' $1').trim().replace(/^./, c => c.toUpperCase())
}
const columns = columnKeys.map(key => {
    return {
        accessorKey: key,
        header: ({ column }) => getHeader(column, formatKeyLabel(key)),
    }
})

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
function getHeader(column: Column, label: string) {
  const isSorted = column.getIsSorted()

  return h(
    UDropdownMenu,
    {
      content: {
        align: 'start'
      },
      'aria-label': 'Actions dropdown',
      items: [
        {
          label: 'Asc',
          type: 'checkbox',
          icon: 'i-lucide-arrow-up-narrow-wide',
          checked: isSorted === 'asc',
          onSelect: () => {
            if (isSorted === 'asc') {
              column.clearSorting()
            } else {
              column.toggleSorting(false)
            }
          }
        },
        {
          label: 'Desc',
          icon: 'i-lucide-arrow-down-wide-narrow',
          type: 'checkbox',
          checked: isSorted === 'desc',
          onSelect: () => {
            if (isSorted === 'desc') {
              column.clearSorting()
            } else {
              column.toggleSorting(true)
            }
          }
        }
      ]
    },
    () =>
      h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label,
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5 data-[state=open]:bg-elevated',
        'aria-label': `Sort by ${isSorted === 'asc' ? 'descending' : 'ascending'}`
      })
  )
}

type ColumnKey = typeof columns[number]['accessorKey']

const tableData = ref<Record<ColumnKey, unknown>[]>()

watch(generatedStats, (newStats) => {
    console.log('watch stat', newStats)
    if(!newStats) return

    tableData.value = newStats.numbers.map(number => {
        const currentIndexSums = newStats.indexSums[number] || 1
        const occurrences = newStats.occurrences[number]
        return {
            number,
            occurrences,
            score: newStats.scores[number],
            averageIndexPosition: Math.round(currentIndexSums / newStats.games.length),
        }
    })
})

const sorting = ref([
  {
    id: 'number',
    desc: true
  }
])


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
            :ui="{ body: 'flex-1 overflow-y-auto p-4 sm:p-6 grid gap-x-4 gap-y-6 grid-cols-2' }"
        >
            <template
                #body
            >
                <UFormField
                    label="Numéro de début"
                >
                    <UInputNumber :min="0" v-model="startValue" />
                </UFormField>
                <UFormField
                    label="Numéro de fin"
                >
                    <UInputNumber :min="1" v-model="endValue" />
                </UFormField>
                <UFormField
                    label="Nombre de parties"
                    class="col-span-full"
                >
                    <UInputNumber :min="0" v-model="gameIteration" />
                </UFormField>
                <UFormField
                    :label="`Lancer par partie: ${roundIteration}/${endValue}`"
                    class="col-span-full"
                >
                    <USlider :min="1" :max="endValue" v-model="roundIteration"/>
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
             v-if="generatedStats.numbers.length && !isWorkerRunning"
        >
            <div :class="spacingStyle">
                <VBingoGridUi :grid="generatedStats.numbers" v-slot="{number}">
                    <span :class="$style['bg-score']" :style="{height: generatedStats.scores?.[number] + '%'}"/>
                </VBingoGridUi>
            </div>
            <UTable
                v-model:sorting="sorting"
                :class="spacingStyle"
                :data="tableData"
                :columns="columns"
            />
        </VSection>
            <div role="status" v-if="isWorkerRunning" :class="$style.loading">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            </div>
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

.loading {
    width: fit-content;
    margin-inline: auto;
    margin-block: 100px;
}
</style>
