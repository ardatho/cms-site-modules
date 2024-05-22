import { createSharedComposable } from '@vueuse/core'
import { useMutation } from '@vue/apollo-composable';

// import type { Item } from '~/types'

const { generateItemQuery, generateItemPatch, generateItemAdd, generateItemDelete } = useCrudQuery()

const _useItem = () => {
  const item = ref<any[]>({});
  const loading = ref(true);
  const { clients } = useApollo()
  const router = useRouter()

  const getItem = async (id: number) => {
    const contentLang = useState('contentLang');
    const results = await useAsyncQuery(generateItemQuery(), { id }, 'default', {headers: { language: contentLang.value}});
    await results.execute();
    item.value = results.data.value?.item || {}
    loading.value = false
  }

  const patchItem = async (id: number, patch: any) => {
    const contentLang = useState('contentLang');
    const results = await clients?.default.mutate({
      mutation: generateItemPatch(),
      variables: { id, patch },
      context: {headers: { language: contentLang.value}}
    });
    console.log(clients?.default);
  }

  const addItem = async (item: any) => {
    const contentLang = useState('contentLang');
    const currentModule = useState('currentModule')
    const results = await clients.default.mutate({
      mutation: generateItemAdd(),
      variables: { item },
      context: {headers: { language: contentLang.value}}
    });
    await clients.default.resetStore();
    await router.push({ name: `${currentModule.value.id}-listing`})
  }

  const deleteItem = async (id: number) => {
    await clients?.default.mutate({
      mutation: generateItemDelete(),
      variables: { id },
    });
  }

  return {
    item,
    getItem,
    patchItem,
    addItem,
    deleteItem,
    loading
  }
}

export const useItem = createSharedComposable(_useItem)
