<script setup lang="ts">
const props = defineProps(['config'])

const inputValue = defineModel()

const getColumnSlotName = (column) => `${column.key}-header`
const getDataSlotName = (column) => `${column.key}-data`
const columns = props.config.props?.relatedFields || []

if (Object.values(props.config.props.actions).some(action => !!action)) {
  if (!columns.find(column => column.key === 'actions')) {
    columns.push({key: 'actions', label: 'generic.actions', type: 'actions'})
  }
}

</script>

<template>
  <UTable
    :columns="columns"
    :rows="inputValue"
  >
    <template
      v-for="columnOption in columns"
      #[getColumnSlotName(columnOption)]="{ column }"
    >
      {{ $t(column.label) }}
    </template>

    <template
      v-for="columnOption in columns"
      #[getDataSlotName(columnOption)]="{ row }"
    >
      <component
        :is="`input-table-cell-${columnOption.type}`"
        :column="columnOption"
        :config="config"
        :row="row"
      />
    </template>
  </UTable>
</template>
