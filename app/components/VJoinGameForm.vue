<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import type { JoinRoomData } from '~/types/bingo'
import { ROOM_ID_LENGTH } from '~~/shared/utils/generate-room-id'

const emits = defineEmits<{
    formSubmit: [data: JoinRoomData]
}>()

const state = reactive<JoinRoomData>({
  userName: '',
  roomId: '',
})

const validate = (data: JoinRoomData) => {
    const errors: FormError[] = []

    if (!data.userName) {
        data.userName = getRandomUserName()
    }

    if (!data.roomId || data.roomId.length < 6) {
        errors.push({
            name: 'roomId',
            message: 'Not valid id',
        })
    }

    return errors
}

async function onSubmit(event: FormSubmitEvent<JoinRoomData>) {
    emits('formSubmit', event.data)
}

</script>

<template>
    <UForm
        :state="state"
        :validate="validate"
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
                @update:model-value="(v) => v.toUpperCase()"
            />
        </UFormField>
        <UFormField
            label="Room ID"
            name="roomId"
            :class="$style['user-name']"
        >
        <UInput
            v-model="state.roomId"
            :maxlength="ROOM_ID_LENGTH"
            aria-describedby="character-count"
            :ui="{ trailing: 'pointer-events-none' }"
        >
            <template #trailing>
            <div
                id="character-count"
                class="text-xs text-muted tabular-nums"
                aria-live="polite"
                role="status"
            >
                {{ state.roomId?.length }}/{{ ROOM_ID_LENGTH }}
            </div>
            </template>
        </UInput>
        </UFormField>
        <UButton type="submit" :class="$style.submit">
            Rejoindre la partie
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
