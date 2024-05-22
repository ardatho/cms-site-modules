import { createSharedComposable } from '@vueuse/core'

// import type { Item } from '~/types'

const { generateItemsQuery } = useCrudQuery()

const _useItems = () => {
  const items = ref<any[]>([]);
  const nItems = ref<number>(0);
  const loading = ref(true);

  const getItems = async () => {
    const contentLang = useState('contentLang');
    const results = await useAsyncQuery(generateItemsQuery(), { }, 'default', {headers: { language: contentLang.value}});
    await results.execute();
    items.value = results.data.value?.items || []
    nItems.value = results.data.value?.nItems.count
    loading.value = false
  }

  return {
    items,
    nItems,
    getItems,
    loading
  }
}

export const useItems = createSharedComposable(_useItems)

import { createSharedComposable } from '@vueuse/core'
