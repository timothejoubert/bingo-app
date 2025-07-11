<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'

// Declaration
const history = useBingoGameHistory()

const UBadge = resolveComponent('UBadge')

const tableData = computed(() => {
    return history.value.map(game => {
        const { id, startDate, status } = game
        return {id, startDate, status }
    })
})

type TableData = (typeof tableData)['value'][number]
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
        paid: 'success' as const,
        failed: 'error' as const,
        refunded: 'neutral' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
]
</script>

<template>
    <UTable :data="tableData" :columns="columns" />
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