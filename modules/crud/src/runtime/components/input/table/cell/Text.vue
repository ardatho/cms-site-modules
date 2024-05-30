<script setup lang="ts">

const props = defineProps(['config', 'row', 'column'])

</script>

<template>
  {{ row[column.key] }}
</template>
