<script lang="ts" setup>
import type { User } from '~/types'

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
const selected = ref<User[]>([])
const selectedColumns = ref(defaultColumns)
const selectedStatuses = ref([])
const sort = ref({ column: 'id', direction: 'asc' as const })
const input = ref<{ input: HTMLInputElement }>()

const columns = computed(() => defaultColumns.filter((column) => selectedColumns.value.includes(column)))

// const defaultLocations = items.value.reduce((acc, user) => {
//   if (!acc.includes(user.location)) {
//     acc.push(user.location)
//   }
//   return acc
// }, [] as string[])

const defaultStatuses = result?.value?.items.reduce((acc, user) => {
  if (!acc.includes(user.status)) {
    acc.push(user.status)
  }
  return acc
}, [] as string[])

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

  // offset: Int
  // limit: Int
  // sort: String
  // order: String
  // fields: String
  // search: String
  // filter: String
  // options: String
const queryInput = computed(() => {
  return {
    offset: (page.value - 1) * pageCount.value,
    limit: pageCount.value,
    search: searchString.value,
    fields: searchFields.join(',')
  }
})

variables.value.queryInput = queryInput
enabled.value = true;
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardToolbar>
        <template #left>
          <USelectMenu
            v-model="selectedStatuses"
            icon="i-heroicons-check-circle"
            placeholder="Status"
            multiple
            :options="defaultStatuses"
            :ui-menu="{ option: { base: 'capitalize' } }"
          />
          <!-- <USelectMenu
            v-model="selectedLocations"
            icon="i-heroicons-map-pin"
            placeholder="Location"
            :options="defaultLocations"
            multiple
          /> -->
        </template>

        <template #right>
          <UInput
            ref="input"
            v-model.lazy="searchString"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filter items..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>

          <USelectMenu v-model="selectedColumns" icon="i-heroicons-adjustments-horizontal-solid" :options="defaultColumns" multiple class="hidden lg:block">
            <template #label>
              Display
            </template>
          </USelectMenu>

          <UButton :label="$t('ui.add') + ' ' + $t(currentModule.verbose_label_singular)" trailing-icon="i-heroicons-plus" color="gray" :to="`/${currentModule.id}/add`" />
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

          <template #name-data="{ row }">
            <div class="flex items-center gap-3">
              <UAvatar v-bind="row.avatar" :alt="row.name" size="xs" />

              <span class="text-gray-900 dark:text-white font-medium">{{ row.name }}</span>
            </div>
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
            <UButton
              icon="i-heroicons-document-duplicate"
              variant="ghost"
              size="xs"
            />
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
    </UDashboardPanel>
  </UDashboardPage>
</template>
