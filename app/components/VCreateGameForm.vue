<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import type { CreateRoomData } from '~/types/bingo'

const emits = defineEmits<{
    formSubmit: [data: CreateRoomData]
}>()

const state = reactive<CreateRoomData>({
  userName: undefined,
  start: 1,
  end: 89,
  manualMode: false,
})

const validate = (data: CreateRoomData) => {
    const errors: FormError[] = []

    if (!data.userName) {
        data.userName = getRandomUserName()
    }

    return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<CreateRoomData>) {
    emits('formSubmit', event.data)

    toast.add({
        title: 'Success',
        description: 'Votre partie va commencer.',
        color: 'success'
    })
}

</script>

<template>
    <UForm
        :validate="validate"
        :state="state"
        @submit="onSubmit"
        :class="$style.root"
    >
        <UFormField
            label="User name"
            name="username"
            :class="$style['user-name']"
        >
            <UInput
                v-model="state.userName"
                placeholder="DBZ_TOZ_26"
                class="w-full"
            />
        </UFormField>
        <UFormField
            name="start"
            label="Numéro de début"
            >
            <UInputNumber :min="1" v-model="state.start" :ui="{base: 'px-0'}"/>
        </UFormField>
        <UFormField
            label="Numéro de fin"
            name="end"
        >
            <UInputNumber :min="state.start + 1" v-model="state.end" :ui="{base: 'px-0'}"/>
        </UFormField>
        <UFormField
            label="Version manuelle"
            description="Rentrer manuellement vos numéros"
            class="col-span-full"
        >
            <UCheckbox v-model="state.manualMode" />
        </UFormField>
        <UButton type="submit" :class="$style.submit">
            Créer la partie
        </UButton>
    </UForm>
</template>
<style lang="scss" module>
.root {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
}

.user-name {
    grid-column: 1 / -1;
    width: 100%;
}

.submit {
    width: fit-content
}
</style>
