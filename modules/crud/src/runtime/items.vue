<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const currentModule = useState('currentModule')

const { result, loading, variables, enabled } = useGetItems(currentModule)
const { mutate: deleteItem } = useDeleteItem(currentModule)

const defaultColumns = currentModule.value.fields
  .filter(field => field.display?.listing)
  .map(field => {
    return { key: field.key, label: field.label}
  })
  .concat([{key: 'actions', label: 'generic.actions'}])

const searchFields = currentModule.value.fields
  .filter(field => field.search)
  .map(field => field.key);

const statuses = ['Offline', 'Online', 'Pending']
const searchString = ref('')
const selected = ref<any[]>([])
const selectedColumns = ref(defaultColumns)
const sort = ref({ column: 'id', direction: 'asc' as const })
const input = ref<{ input: HTMLInputElement }>()

const columns = computed(() => defaultColumns.filter((column) => selectedColumns.value.includes(column)))

const onSelect = async (row: any) => {
  await router.push(`${route.path}/${row.id}/edit`);
}

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})

const getColumnSlotName = (column) => `${column.key}-header`

const items = computed(() => result.value?.items ?? []);

const page = ref(1)
const pageCount = ref(10)
const rowPerPages = [10, 25, 50];
const pageTotal = computed(() => result.value?.nItems.count || 0);
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

const displayFilters = ref(false);
const filterValues = ref({});

const resetFilter = () => {
  filterValues.value = {}
  searchString.value = null
}

const queryInput = computed(() => {
  return {
    offset: (page.value - 1) * pageCount.value,
    limit: pageCount.value,
    search: searchString.value,
    fields: searchFields.join(','),
    filter: Object.entries(filterValues.value).map(([key, value]) => `${key}:${value}`).join(',')
  }
})

variables.value.queryInput = queryInput;
enabled.value = true;

</script>

<template>
  <UDashboardToolbar>
    <template #left>
      <UButton
        :label=" displayFilters ? $t('ui.hide_filters') : $t('ui.show_filters')"
        leading-icon="i-heroicons-adjustments-horizontal"
        color="gray"
        @click="displayFilters = !displayFilters"
      />
    </template>

    <template #right>
      <USelectMenu v-model="selectedColumns" icon="i-heroicons-adjustments-horizontal-solid" :options="defaultColumns" multiple class="hidden lg:block">
        <template #label>
          Display
        </template>
      </USelectMenu>

      <UButton :label="$t('ui.add') + ' ' + $t(currentModule.verbose_label_singular)" trailing-icon="i-heroicons-plus" color="gray" :to="`/${currentModule.id}/add`" />
    </template>
  </UDashboardToolbar>

  <UDashboardToolbar v-if="displayFilters">
    <template #left>
      <UInput
        ref="input"
        v-model.lazy="searchString"
        icon="i-heroicons-funnel"
        autocomplete="off"
        placeholder="Filter items..."
        @keydown.esc="$event.target.blur()"
      >
        <template #trailing>
          <UKbd value="/" />
        </template>
      </UInput>

      <FilterForm
        v-model="filterValues"
        :filters="currentModule.filters"
      />
    </template>

    <template #right>
      <UButton
        :label="$t('ui.reset')"
        trailing-icon="i-heroicons-x-mark"
        :disabled="Object.keys(filterValues).length === 0 && !searchString"
        @click="resetFilter()"
      />
    </template>
  </UDashboardToolbar>

  <div>
    <UTable
      v-model="selected"
      v-model:sort="sort"
      :rows="items"
      :columns="columns"
      :loading="loading"
      sort-mode="manual"
      class="w-full"
      :ui="{ wrapper: 'overflow-y-auto h-1/2', divide: 'divide-gray-200 dark:divide-gray-800', thead: 'sticky', tbody: 'h-52' }"
      @select="onSelect"
    >
      <template
        v-for="columnOption in columns"
        #[getColumnSlotName(columnOption)]="{ column }"
      >
        {{ $t(column.label) }}
      </template>

      <template #created_at-data="{ row }">
        {{ row.created_at ? new Date(row.created_at).toLocaleDateString() : '' }}
      </template>

      <template #status-data="{ row }">
        <UBadge :label="statuses[row.status]" :color="row.status === 1 ? 'green' : row.status === 2 ? 'orange' : 'red'" variant="subtle" class="capitalize" />
      </template>
      <template #actions-data="{ row }">
        <UButton
          icon="i-heroicons-pencil"
          size="xs"
          variant="ghost"
          :to="`${$route.path}/${row.id}/edit`"
        />
        <UButton
          icon="i-heroicons-trash"
          variant="ghost"
          size="xs"
          @click.stop="deleteItem({id: row.id})"
        />
        <!-- <UButton
          icon="i-heroicons-document-duplicate"
          variant="ghost"
          size="xs"
        /> -->
      </template>
    </UTable>
  </div>

  <UFooter>
    <template #center>
      <div class="flex flex-wrap justify-between items-center">
        <span class="text-sm leading-5 pl-4">
          {{ $t('generic.rows_per_page') }}
        </span>

        <USelectMenu class="pl-4" v-model="pageCount" :options="rowPerPages" />

        <span class="text-sm leading-5 pl-4">
          <span class="font-medium">{{ pageFrom }}</span>-<span class="font-medium">{{ pageTo }}</span>
          of
          <span class="font-medium">{{ pageTotal }}</span>
        </span>

        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="pageTotal"
          :ui="{
            wrapper: 'flex items-center gap-1 pl-4',
            rounded: '!rounded-full min-w-[32px] justify-center',
            default: {
              activeButton: {
                variant: 'outline'
              }
            }
          }"
        />
      </div>

    </template>
  </UFooter>
</template>
