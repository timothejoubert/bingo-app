<script lang="ts" setup>
import { useWebSocket } from '@vueuse/core'
import type {RoomMessage} from '~~/shared/types/room'

const statusUser = {
    name: 'Bingo-app',
    color: 'yellow',
}

definePageMeta({
    name: 'room',
})

// INIT WS
const wsUrl = computed(() => {
    if (!location) return

    const protocol = location?.protocol === 'https:' ? 'wss' : 'ws'
    return `${protocol}://${location.host}/api/room-web-socket`
})
const { status, data, send, open, close } = useWebSocket(wsUrl,{ immediate: false })
if (import.meta.client) {
    open()
}
watch(status, (value) => {
    console.log('watch WS status:', value)
})

// GET ROOM ID
const route = useRoute()
function getFirst<T>(item: T | T[] | undefined): T | undefined {
    return Array.isArray(item) ? item[0] : item
}

const routeId = computed(() => {
    const paramId = route.params.id
    const queryId = route.query.roomId
    return getFirst(paramId) || getFirst(queryId) || undefined
})

const roomId = ref<string | undefined>()
if (routeId.value && import.meta.client) {
    joinRoom({
        userName: 'toz',
        roomId: routeId.value,
    })
}

// WS DATA
const history = ref<RoomMessage[]>([])

// GET WS DATA
watch(data, (value) => {
    const payload = JSON.parse(value)
    console.log('watch data', payload)
    if (!roomId.value && payload.roomId) {
        roomId.value = payload.roomId
    }
    const isMe = userName.value === payload.userName

    // if (!roomId.value && message.roomId) {
    //     navigateTo({ name: 'room', params: { id: message.roomId }})
    // }

    if (payload.type === 'userMessage' && payload.content) {
        console.log('push new user message in history', payload)
        history.value.unshift({
            user: {
                name: userName.value,
                isMe,
            },
            content: payload.content,
            timestamp: new Date().getTime()
        })
    }

    if (payload.type === 'roomCreated') {
        history.value.unshift({
            user: statusUser,
            content: `🆕 Room créée : ${payload.roomId} par ${payload.userName}`,
            timestamp: new Date().getTime()
        })
    }

    if (payload.type === 'userJoined') {
        history.value.unshift({
            user: statusUser,
            content: `👤 ${payload.userName}${isMe ? '{vous}' : ''} a rejoint la room`,
            timestamp: new Date().getTime()
        })
    }

    if (payload.type === 'error') {
        history.value.unshift({
            user: statusUser,
            content: `⚠️ Erreur : ${payload.message}`,
            timestamp: new Date().getTime()
        })
    }
})

// ROOM
const userName = ref('')
function createRoom(gameData: CreateRoomData) {
    const id = generateRoomId()
    roomId.value = id
    userName.value = gameData.userName || ''
    const payload = {
        type: 'createRoom',
        roomId: id,
        userName: gameData.userName,
        timestamp: new Date().getTime()
    }

    console.log('createRoom', payload.roomId, status.value, data.value)

    send(JSON.stringify(payload))
}

function joinRoom(gameData: JoinRoomData) {
    roomId.value = gameData.roomId
    userName.value = gameData.userName || ''
    const payload = {
        type: 'joinRoom',
        roomId: gameData.roomId,
        userName: gameData.userName,
        timestamp: new Date().getTime()
    }

    send(JSON.stringify(payload))
}

function onSendMessage(message: string) {

    console.log('send message', message)

    send(JSON.stringify({
        type: 'userMessage',
        roomId: roomId.value,
        userName: userName.value,
        content: message,
    }))
}

const pageTitle = computed(() => {
    return `Room ${roomId.value || ''}${userName.value ? ' | ' + userName.value : ''}`
})


useHead({
    title: pageTitle
})
</script>

<template>
    <VSection
        v-slot="{ spacingStyle }"
        title="Création d'une nouvelle partie"
    >
        <div :class="[$style.forms, spacingStyle]">
            <VCreateGameForm :disabled="!!roomId" @form-submit="createRoom"/>
            <VJoinGameForm :disabled="!!roomId"  @form-submit="joinRoom"/>
        </div>
    </VSection>
    <VSection
        v-slot="{ spacingStyle }"
        :title="'Log: ' + roomId "
    >
        <div :class="spacingStyle">
            <ul>
                <li v-for="entry in history">{{ entry }}</li>
            </ul>
            <VChat
                :messages="history"
                :class="spacingStyle"
                @sendMessage="onSendMessage"
            />
        </div>
    </VSection>
</template>

<style lang="scss" module>
.forms {
    display: flex;
    flex-wrap: wrap;
    gap: 64px 32px;
    justify-content: space-evenly;
    align-items: flex-start;
}

.room {
    display: flex;
    justify-content: space-between;
}
</style>
