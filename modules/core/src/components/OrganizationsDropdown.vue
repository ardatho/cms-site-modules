<script setup lang="ts">
const organizations = [{
  label: 'Ardatho',
  avatar: {
    src: 'https://ardatho.com/favicon.ico'
  },
  click: () => {
    organization.value = organizations[0]
  }
}, {
  label: 'NuxtLabs',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/62017400?s=200&v=4'
  },
  click: () => {
    organization.value = organizations[1]
  }
}]

const actions = [{
  label: 'Create organization',
  icon: 'i-heroicons-plus-circle'
}, {
  label: 'Manage organizations',
  icon: 'i-heroicons-cog-8-tooth'
}]

const organization = ref(organizations[0])
</script>

<template>
  <UDropdown
    v-slot="{ open }"
    mode="hover"
    :items="[organizations, actions]"
    class="w-full"
    :ui="{ width: 'w-full' }"
    :popper="{ strategy: 'absolute' }"
  >
    <UButton color="gray" variant="ghost" :class="[open && 'bg-gray-50 dark:bg-gray-800']" class="w-full">
      <UAvatar :src="organization.avatar.src" size="2xs" />

      <span class="truncate text-gray-900 dark:text-white font-semibold">{{ organization.label }}</span>
    </UButton>
  </UDropdown>
</template>
