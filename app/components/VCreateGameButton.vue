<script lang="ts" setup>

// const start = ref(1)
// const end = ref(99)

// const { createNewGame } = useBingoGame()
// const history = useBingoGameHistory()

// function onSubmit(event: Event) {
//     event.preventDefault()

//     const index = Number(history.value.length) + 1
//     const id = index.toString()
//     createNewGame(id, { gridStart: start.value, gridEnd: end.value })

//     console.log('createNewGame', id)
//     navigateTo({ name: 'game', params: { id }})
// }

</script>
<template>
  <UModal
    title="Modal with description"
    :transition="false"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  >
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <VPlaceholder class="h-48" />
    </template>
  </UModal>
</template>
