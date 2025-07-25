<script lang="ts" setup>
import { useEventListener } from '@vueuse/core';


defineProps<{
    messages: RoomMessage[]
    disabled?: boolean
}>()

const emits = defineEmits<{
    sendMessage: [value: string]
}>()

const formatter = new Intl.DateTimeFormat('fr', {
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
})
function formatDate(timestamp: number) {
    return formatter.format(new Date(timestamp))
}

const message = ref('')

useEventListener('keyup', (event: KeyboardEvent) => {
    console.log('k', event)
    if (event.key === 'Enter') {
        omSendClicked()
    }
})

function omSendClicked() {
    const msg = message.value.trim()
    emits('sendMessage', msg)
    message.value = ''
}
</script>

<template>
    <div>
        <ul :class="$style.list">
            <li
                v-for="(message, i) in messages"
                :key="i"
                :class="[
                    $style.item,
                    message.user?.isMe && $style['item--me']
                ]"
            >
                <time :class="$style.time" :datetime="message.timestamp.toString()">{{ formatDate(message.timestamp) }}</time>
                <div :class="$style.message">
                    <span v-if="!message.user?.isMe" :class="$style['user']">{{ message.user?.name || 'Unknown user' }}: </span>
                    <span :class="$style.content">{{ message.content }}</span>
                </div>
            </li>
        </ul>
        <div :class="$style['box']">
            <UInput
                placeholder="Type yout message here..."
                v-model="message"
                :disabled="disabled"
                :class="$style.input"
                :ui="{ base: $style['textarea']}"
            />
            <UButton @click="omSendClicked" icon="i-lucide-send-horizontal" size="lg" color="neutral"  variant="solid" :class="$style['send']"/>
        </div>
    </div>
</template>
<style lang="scss" module>
.list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-height: 500px;
    padding: 20px;
    overflow: auto;
    border: 1px solid var(--ui-border);
}

.item {
    display: flex;
    gap: 12px;
    align-items: center;
    width: fit-content;

    &--me {
        align-self: flex-end;
        flex-direction: row-reverse;
    }
}

.time {
    font-size: 13px;
}

.message {
    padding: 2px 12px;
    border-radius: 6px;
    background-color: var(--ui-bg-accented);
}

.user {
    font-weight: light;
}

.content {
    font-weight: bold;
}


.box {
    position: relative;
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.input {
    width: 100%;
}

.textarea {
    padding-right: 40px;
    width: 100%;
}

.send {
    cursor: pointer;
}
</style>
