<script setup lang="ts">

const ui = /*ui*/ {
  background: 'bg-white dark:bg-slate-900'
}
</script>

<template>
  <div style="display: flex;">
    <div class="w-1/2 h-screen">
      <UCard :ui="ui" class="h-full"/>
    </div>
    <div class="w-1/2 h-screen">
      <UCard :ui="ui" class="h-full flex justify-center grid content-center">
        <slot />
      </UCard>
    </div>
  </div>
</template>