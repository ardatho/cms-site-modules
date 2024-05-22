<script setup lang="ts">
definePageMeta({
  middleware: ["crud"]
})

const currentModule = useState('currentModule')

const contentLang = useState('contentLang', () => 'en');
const displayLang = useState('displayLang', () => true);
const breadCrumbs = useState('breadCrumbs', () => []);

const { clients } = useApollo()

const itemsLang = [
  [
    {
      label: 'contentLang.en',
      slot: 'en',
      click: async () => {
        contentLang.value = 'en'
        await clients.default.resetStore();
      }
    },
    {
      label: 'contentLang.fr',
      slot: 'fr',
      click: async () => {
        contentLang.value = 'fr'
        await clients.default.resetStore();
      }
    }
  ]
];

onMounted(() => {
  breadCrumbs.value = [{ label: currentModule.value?.label, to: `/${currentModule.value?.id}`}]
})

</script>

<template>
  <div v-if="!currentModule">
    Loading
  </div>
  <div v-else>
    <UDashboardPage>
      <UDashboardPanel grow>
        <UDashboardNavbar>
          <template #toggle>
            <div />
          </template>
          <template #left>
            <UBreadcrumb :links="breadCrumbs">
              <template #default="{ link }">
                {{ $t(link.label) }}
              </template>
            </UBreadcrumb>
          </template>
          <template #right>
            <UDropdown v-if="displayLang" :items="itemsLang" :popper="{ placement: 'bottom-start' }">
              <UButton color="white" :label="$t(`contentLang.${contentLang}`)" trailing-icon="i-heroicons-chevron-down-20-solid" />
              <template #en="{ item }">
                {{ $t(item.label) }}
              </template>
              <template #fr="{ item }">
                {{ $t(item.label) }}
              </template>
            </UDropdown>
          </template>
        </UDashboardNavbar>

        <NuxtPage />
      </UDashboardPanel>
    </UDashboardPage>
  </div>
</template>
