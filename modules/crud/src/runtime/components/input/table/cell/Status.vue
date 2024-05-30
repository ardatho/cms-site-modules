<script setup lang="ts">

const props = defineProps(['config', 'row', 'column'])

const statuses = ['Offline', 'Online', 'Pending']

</script>

<template>
  <UBadge
    :label="statuses[row[column.key]]"
    :color="row[column.key] === 1 ? 'green' : row[column.key] === 2 ? 'orange' : 'red'"
    variant="subtle"
    class="capitalize"
  />
</template>
