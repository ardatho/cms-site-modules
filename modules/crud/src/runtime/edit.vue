<script setup lang="ts">
definePageMeta({
  middleware: ["crud"]
})

const route = useRoute()
const { item, loading, getItem, patchItem } = useItem()

const currentModule = useState('currentModule');
const breadCrumbs = useState('breadCrumbs');

const state = reactive({})

const form = ref()

onMounted(async () => {
  await getItem(parseInt(route.params.id));
  console.log({item})
  Object.assign(state, item.value);
  breadCrumbs.value.push({ label: item.value[currentModule.value.itemBreadcrumb]})
})

onBeforeUnmount(() => {
  breadCrumbs.value.splice(-1);
})

const save = async (event) => {
  const patchDiff = {}

  for (const key of Object.keys(state)) {
    if (state[key] !== item.value[key]) {
      patchDiff[key] = state[key];
    }
  }
  console.log('Saving...:', {state, event, patchDiff});
  await patchItem(parseInt(route.params.id), patchDiff);
}

const groupPanels = () => {
  return currentModule.value.groupFields?.length > 0
    ? currentModule.value.groupFields
    : [{
      key: 'general',
      label: 'generic.main_group',
      hashLink: 'general-info',
      panel: true
    }];
}

const editGroupFields = (key) => {
  return currentModule.value.fields
    .filter(field => field.display?.edit)
    .filter(field => field.groupkey === key)
}

</script>

<template>
  <UDashboardPage v-if="!loading">
    <UDashboardPanel grow>
      <UDashboardToolbar>
        <template #right>
          <UButton :label="$t('ui.save')" trailing-icon="i-heroicons-document-check" color="green" @click="save()" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <UForm ref="form" :state="state" @submit="save">
          <UAccordion
            :items="groupPanels()"
            :ui="{ wrapper: 'flex flex-col w-full' }"
            multiple
            default-open
          >
            <template #default="{ item, index, open }">
              <UButton color="gray" variant="ghost" class="border-b border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
                <template v-if="item.icon" #leading>
                  <div class="w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 flex items-center justify-center -my-1">
                    <UIcon :name="item.icon" class="w-4 h-4 text-white dark:text-gray-900" />
                  </div>
                </template>

                <span>{{ $t(item.label) }}</span>

                <template #trailing>
                  <UIcon
                    name="i-heroicons-chevron-right-20-solid"
                    class="w-5 h-5 ms-auto transform transition-transform duration-200"
                    :class="[open && 'rotate-90']"
                  />
                </template>
              </UButton>
            </template>

            <template #item="{ item }">
              <UFormGroup
                v-for="field in editGroupFields(item.key)"
                :key="field.key"
                :label="$t(field.label)"
                :name="field.key"
              >
                <UInput v-model="state[field.key]" />
              </UFormGroup>
            </template>
          </UAccordion>

          <div class="flex justify-center mt-6">
            <UButton :label="$t('ui.save')" color="green" type="submit" />
          </div>
        </UForm>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
