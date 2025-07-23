<script lang="ts" setup>

defineProps<{
    buttonLabel?: string
}>()

const modalOpened = ref(false)

const history = useBingoGameList()

const newGameId = computed(() => {
    const length = (history.value?.length || 0)
    return (length + 1).toString()
})

const { createNewGame } = useBingoGame(newGameId.value)

const manuelMode = ref(false)
const startValue = ref(1)
const endValue = ref(89)

function onSubmit() {
    const id = newGameId.value

    createNewGame({
        gridStart: startValue.value,
        gridEnd: endValue.value,
        manualMode: manuelMode.value
    })

    navigateTo({ name: 'game', params: { id } })
}
</script>

<template>
    <div>
        <UButton
            :label="buttonLabel || 'Lancer une partie'"
            class="block mx-auto"
            @click="modalOpened =! modalOpened"
        />
        <UModal
        v-model:open="modalOpened"
        title="Création d'une nouvelle partie"
        description="Définissez vos paramètres"
        :ui="{ body: 'grid gap-x-4 gap-y-6 grid-cols-2', footer: 'justify-end' } "
    >
        <template
            #body
            class="text-h2"
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
                label="Version manuelle"
                description="Rentrer manuellement les numéros tirés chez vous."
                class="col-span-full"
            >
                <UCheckbox v-model="manuelMode" />
            </UFormField>
        </template>

        <template #footer="{ close }">
            <UButton
                label="Annuler"
                color="neutral"
                variant="subtle"
                @click="close"
            />
            <UButton
                label="Valider"
                variant="subtle"
                @click="onSubmit"
            />
        </template>
    </UModal>
    </div>
</template>
