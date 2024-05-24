import { provideApolloClient, useQuery } from '@vue/apollo-composable';

const { generateItemQuery } = useCrudQuery()

export const useGetItem = (currentModule) => {
  const { clients } = useApollo()
  const contentLang = useState('contentLang');
  const enabled = ref(false);

  const { result, loading, error, variables, refetch } = provideApolloClient(clients.default)(() =>
    useQuery(generateItemQuery(currentModule.value), { id: null }, { enabled, context: {headers: { language: contentLang.value}}})
  );

  return {
    result,
    loading,
    error,
    variables,
    refetch,
    enabled,
  }
}
