import { provideApolloClient, useQuery } from '@vue/apollo-composable';


export const useFilter = (config) => {
  const { clients } = useApollo()
  const currentModule = useState('currentModule')
  const enabled = ref(false);

  const upperKeyName = (key: string) => key.charAt(0).toUpperCase() + key.slice(1);

  const { result, loading, error, variables, refetch } = provideApolloClient(clients.default)(() => {
    const query = gql`
      query ${currentModule.value.idSingular}${upperKeyName(config.id)} {
        filters: ${currentModule.value.idSingular}${upperKeyName(config.id)} {
          value
          text
        }
      }`;
    return useQuery(query, {}, { enabled })
  });

  return {
    result,
    loading,
    error,
    variables,
    refetch,
    enabled
  }
}
