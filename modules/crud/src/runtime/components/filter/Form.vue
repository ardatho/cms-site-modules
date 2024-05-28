<script setup>
const props = defineProps(['filters'])
const filterValues = defineModel()

const options = [{
  value: 0,
  text: 'generic.offline',
},{
  value: 1,
  text: 'generic.online',
},{
  value: 2,
  text: 'generic.inprogress',
}]

import SelectFilter from './Select.vue';
</script>

<template>
  <div class="flex">
    <div
      v-for="filter in props.filters"
      :key="filter.id"
    >
      <SelectFilter
        v-if="filter.type === 'select'"
        v-model="filterValues[filter.id]"
        :config="filter"
      />
      <div v-else>
        {{ filter.id }}
      </div>
    </div>
  </div>
</template>
