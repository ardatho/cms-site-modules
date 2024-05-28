<script setup lang="ts">
const props = defineProps(['config'])

const inputValue = defineModel()

const getColumnSlotName = (column) => `${column.key}-header`
const columns = props.config.props?.relatedFields || []
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
  </UTable>
</template>
