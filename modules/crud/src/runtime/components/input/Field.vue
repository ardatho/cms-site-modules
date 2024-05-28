<script setup lang="ts">
import useField from './useField';

const props = defineProps(['config'])

const inputValue = defineModel()

const { fieldOptions } = useField(props.config)
</script>

<template>
  <UFormGroup
    :name="config.key"
  >
    <template #label>
      {{ $t(config.label) }} {{ fieldOptions.required ? '*' : '' }}
    </template>
    <component
      :is="fieldOptions.component"
      v-model="inputValue"
      :config="config"
      v-bind="{ ...$attrs, ...fieldOptions.props }"
    />
  </UFormGroup>
</template>
