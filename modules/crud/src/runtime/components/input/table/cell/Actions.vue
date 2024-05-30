<script setup lang="ts">

const props = defineProps(['config', 'row'])

const selectRowAction = props.config.props.actions?.selectRows || false;
const editRowAction = props.config.props.actions?.editRows || false;
const deleteRowAction = props.config.props.actions?.deleteRows || false;
const addRowAction = props.config.props.actions?.addRows || false;
const toEditRowAction = props.config.props.actions?.toEditRows || false;

const deleteItem = ({ id }) => {
  console.log('Delete item with ID:', id)
}

const toEditItem = (row) => {
  return `/${props.config.related_id}/${row.id}/edit`
}

</script>

<template>
  <div>
    <UButton
      v-if="editRowAction"
      icon="i-heroicons-pencil"
      size="xs"
      variant="ghost"
    />
    <UButton
      v-if="toEditRowAction"
      icon="i-heroicons-chevron-double-right"
      size="xs"
      variant="ghost"
      :to="toEditItem(row)"
    />
    <UButton
      v-if="deleteRowAction"
      icon="i-heroicons-trash"
      variant="ghost"
      size="xs"
      @click.stop="deleteItem({id: row.id})"
    />
  </div>
</template>
