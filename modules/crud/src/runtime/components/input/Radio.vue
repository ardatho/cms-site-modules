<script setup>
const props = defineProps(['config'])

const inputValue = defineModel()

</script>

<template>
  <URadioGroup
    v-model="inputValue"
    :options="config.items"
  >
    <template #label="{ option }">
      <span>{{ $t(option.text) }}</span>
    </template>
  </URadioGroup>
</template>
