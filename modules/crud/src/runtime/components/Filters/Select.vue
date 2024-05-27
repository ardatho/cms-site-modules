<script setup>
const props = defineProps(['config'])

const filterValue = defineModel()

const { result, loading, enabled } = useFilter(props.config)

const options = computed(() => result.value?.filters || []);

const selectedValue = computed(() => options.value.find(option => option.value == filterValue.value)?.text || null)

enabled.value = true;
</script>

<template>
  <USelectMenu
    v-model="filterValue"
    :placeholder="$t(config.label)"
    value-attribute="value"
    option-attribute="text"
    :options="options"
    :loading="loading"
  >
    <template
      v-if="selectedValue"
      #label
    >
      <span>{{ $t(selectedValue) }}</span>
    </template>
    <template #option="{ option }">
      <span>{{ $t(option.text) }}</span>
    </template>
  </USelectMenu>
</template>
