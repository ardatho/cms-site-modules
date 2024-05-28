<script setup>
const props = defineProps(['config'])

const inputValue = defineModel()

const selectedValue = computed(() => props.config.items.find(option => option.value == inputValue.value) || null)
</script>

<template>
  <USelectMenu
    v-model="inputValue"
    value-attribute="value"
    option-attribute="text"
    :options="config.items"
  >
    <template
      v-if="selectedValue"
      #label
    >
      <span>{{ $t(selectedValue.text) }}</span>
    </template>
    <template #option="{ option }">
      <span>{{ $t(option.text) }}</span>
    </template>
  </USelectMenu>
</template>
