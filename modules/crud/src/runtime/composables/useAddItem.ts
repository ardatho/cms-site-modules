import { provideApolloClient, useMutation } from '@vue/apollo-composable';

const { generateItemAdd } = useCrudQuery()

export const useAddItem = (currentModule) => {
  const { clients } = useApollo()
  const router = useRouter()
  const contentLang = useState('contentLang');
  const toast = useToast();

  const { mutate, loading, error, onDone, onError } = provideApolloClient(clients.default)(() =>
    useMutation(generateItemAdd(currentModule.value), { context: {headers: { language: contentLang.value}}})
  );

  onDone(async () => {
    toast.add({ title: 'Element successfully added' })
    await clients.default.resetStore();
    router.push({ name: `${currentModule.value.id}-listing`})
  })

  onError((error) => {
    console.error({error})
    toast.add({ title: 'Something went wrong', color: 'red' })
  })

  return {
    mutate,
    loading,
    error
  }
}
