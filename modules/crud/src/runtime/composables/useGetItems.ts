import { provideApolloClient, useQuery } from '@vue/apollo-composable';

const { generateItemsQuery } = useCrudQuery()

export const useGetItems = (currentModule) => {
  const { clients } = useApollo()
  const contentLang = useState('contentLang');

  const { result, loading, error, variables, refetch } = provideApolloClient(clients.default)(() =>
    useQuery(generateItemsQuery(currentModule.value), undefined, { enabled: true, context: {headers: { language: contentLang.value}}})
  );

  return {
    result,
    loading,
    error,
    variables,
    refetch,
  }
}
