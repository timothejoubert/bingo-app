<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { h, resolveComponent } from 'vue'
import type { Row } from '@tanstack/vue-table'
import { useClipboard } from '@vueuse/core'

// Declaration
const history = useBingoGameHistory()

const uTableMounted = ref(false)

const loading = computed(() => {
    return !history.value && !uTableMounted.value
})

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UBadge = resolveComponent('UBadge')

const toast = useToast()

const tableData = computed(() => {
    return history.value?.map(game => {
        const { id, startDate, status } = game
        return {id, startDate, status }
    }) || []
})

type TableData = Required<(typeof tableData)['value'][number]>
const columns: TableColumn<TableData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      return new Date(row.getValue('startDate')).toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        started: 'success' as const,
        failed: 'error' as const,
        finished: 'neutral' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
    {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end'
            },
            items: getRowItems(row),
            'aria-label': 'Actions dropdown'
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown'
            })
        )
      )
    }
  }
]

function getRowItems(row: Row<TableData>) {
  return [
    {
      type: 'label',
      label: 'Actions'
    },
    {
      label: 'Accéder à la partie',
      onSelect() {
        const id = row.getValue('id')
        navigateTo({ name: 'game', params: { id } } )
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Supprimer la partie',
      onSelect() {
        const id = row.getValue('id')
        if(id) useBingoGame(id).deleteGame()

        toast.add({
          title: `Partie #${id} à bien été supprimée`,
          color: 'success',
          icon: 'i-lucide-circle-check'
        })
      }
    },
  ]
}
</script>

<template>
    <UTable
      :data="tableData"
      :columns="columns"
      @vue:mounted="uTableMounted = true"
      :loading="loading"
      loading-color="primary"
      loading-animation="carousel"
    />
</template>

<style lang="scss" module>
.table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    overflow: hidden;
}


.td,
.th {
    border-top: 1px solid #cbcbcb;
    padding: 10px;
}

.td {
    border-left: 1px solid #cbcbcb;
    border-right: 1px solid #cbcbcb;
}

.th {
    background-color: #4ECDC4;
}

.thead .td {
    background-color: #e3e2e2;
}

.tr:nth-of-type(even) .td {
    background-color: #f0f0f0;
}

</style>
