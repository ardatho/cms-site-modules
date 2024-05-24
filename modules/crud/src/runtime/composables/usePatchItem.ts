import { provideApolloClient, useMutation } from '@vue/apollo-composable';

const { generateItemPatch } = useCrudQuery()

export const usePatchItem = (currentModule) => {
  const { clients } = useApollo()
  const contentLang = useState('contentLang');
  const toast = useToast();

  const { mutate, loading, error, onDone, onError } = provideApolloClient(clients.default)(() =>
    useMutation(generateItemPatch(currentModule.value), { context: {headers: { language: contentLang.value}}})
  );

  onDone(() => {
    toast.add({ title: 'Element successfully modified' })
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
