<script setup lang="ts">
const props = defineProps(['config'])

const inputValue = defineModel()
</script>

<template>
  <UInput
    v-model="inputValue"
    v-bind="$attrs"
  />
</template>
