<script lang="ts" setup>

defineProps<{
    buttonLabel?: string
}>()

const { createNewGame } = useBingoGame()
const history = useBingoGameHistory()

const startValue = ref(1)
const endValue = ref(99)

function onSubmit() {
    const index = Number(history.value?.length || 0) + 1
    const id = index.toString()
    createNewGame(id, { gridStart: startValue.value, gridEnd: endValue.value })

    console.log('createNewGame', id)

    // Naviguer vers la partie
    navigateTo({ name: 'game', params: { id } })
}
</script>

<template>
    <UModal
        title="Création d'une nouvelle partie"
        description="Définissez vos paramètres"
        :ui="{ body: 'flex gap-x-4', footer: 'justify-end' } "
    >
        <UButton
            :label="buttonLabel || 'Lancer une partie'"
            variant="subtle"
        />
        <template
            #body
            class="text-h2"
        >
            <UFormField
                label="Numéro de début"
                class="w-1/2"
            >
                <UInputNumber v-model="startValue" />
            </UFormField>
            <UFormField
                label="Numéro de fin"
                class="w-1/2"
            >
                <UInputNumber v-model="endValue" />
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
</template>
