<script setup lang="ts">
const route = useRoute()
const currentModule = useState('currentModule');
const breadCrumbs = useState('breadCrumbs');

const { result, loading: loadGetItem, variables, enabled } = useGetItem(currentModule);
const { mutate: saveItem, loading: loadPatchItem } = usePatchItem(currentModule);

const state = reactive({});
const formElement = ref()

watch(result,
  value => {
    breadCrumbs.value.push({ label: value.item[currentModule.value.itemBreadcrumb]})
    Object.assign(state, value.item);
  }
)

onMounted(() => {
  variables.value.id = parseInt(route.params.id)
  enabled.value = true;
})

onBeforeUnmount(() => {
  breadCrumbs.value.splice(-1);
})

const save = async (event) => {
  const patchDiff = {}

  for (const key of Object.keys(state)) {
    if (state[key] !== result.value.item[key]) {
      patchDiff[key] = state[key];
    }
  }
  console.log('Saving...:', {state, event, patchDiff});
  await saveItem({id: parseInt(route.params.id), patch: patchDiff });
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

const statusField = currentModule.value.fields.find(field => field.type === 'status')
const selectedStatusField = computed(() => statusField.items?.find(item => item.value === state.status));

</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardToolbar>
        <template #right>
          <USelectMenu
            v-if="statusField"
            v-model="state.status"
            :options="statusField.items"
            value-attribute="value"
            option-attribute="text"
            :color="selectedStatusField?.color"
          >
            <template #label>
              <UIcon
                name="i-heroicons-power"
                :style="`color: ${selectedStatusField?.color}`"
              />
              <span class="truncate">{{ $t(selectedStatusField?.text || '') }}</span>
            </template>

            <template #option="{ option }">
              <UIcon name="i-heroicons-power" :style="`color: ${option.color}`" />
              <span>{{ $t(option.text) }}</span>
            </template>
          </USelectMenu>
          <UButton :label="$t('ui.save')" trailing-icon="i-heroicons-document-check" color="green" @click="save()" :disabled="loadPatchItem" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent v-if="!loadGetItem">
        <UForm ref="formElement" :state="state" @submit="save">
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
                    name="i-heroicons-chevron-right"
                    class="w-5 h-5 ms-auto transform transition-transform duration-200"
                    :class="[open && 'rotate-90']"
                  />
                </template>
              </UButton>
            </template>

            <template #item="{ item }">
              <InputField
                v-for="field in editGroupFields(item.key)"
                :key="field.key"
                v-model="state[field.key]"
                :config="field"
              />
            </template>
          </UAccordion>

          <div class="flex justify-center mt-6">
            <UButton :label="$t('ui.save')" color="green" type="submit" :disabled="loadPatchItem" />
          </div>
        </UForm>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
