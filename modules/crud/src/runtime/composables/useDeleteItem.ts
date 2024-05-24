import { provideApolloClient, useMutation } from '@vue/apollo-composable';

const { generateItemDelete } = useCrudQuery()

export const useDeleteItem = (currentModule) => {
  const { clients } = useApollo()
  const contentLang = useState('contentLang');
  const toast = useToast();

  const { mutate, loading, error, onDone, onError } = provideApolloClient(clients.default)(() =>
    useMutation(generateItemDelete(currentModule.value), { context: {headers: { language: contentLang.value}}})
  );

  onDone(async () => {
    toast.add({ title: 'Element successfully deleted' });
    await clients.default.reFetchObservableQueries();
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
