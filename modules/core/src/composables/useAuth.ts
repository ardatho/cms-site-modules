import { createSharedComposable } from '@vueuse/core'

import type { Nullable, User } from '~/types'

const _useAuth = () => {
  const nuxtApp = useNuxtApp()
  const router = useRouter()
  const me = ref<Nullable<User>>(null);

  const login = async (data: { username: string; password: string;}) => {

    try {
        const res = await nuxtApp.$apollo.defaultClient.mutate({
            mutation: gql`
              mutation Mutation($username: String!, $password: String!) {
                token: login(username: $username, password: $password)
              }
            `,
            variables: data
        });
        await nuxtApp.$apolloHelpers.onLogin(res.data.token)

    } catch (e) {
        console.error(e)
    }
  }

  const fetchCurrentUser = async () => {
    try {
      me.value = await getMe()
    } catch (err) {
      await router.push('/login')
    }
  }

  const getMe = async () => {
    const results = await nuxtApp.$apollo.defaultClient.query({
      query: gql`
        query Query {
          me {
            id
            firstname
            lastname
            email
          }
        }
      `
    })
    return results.data.me
  }

  const logout = async () => {
    await nuxtApp.$apolloHelpers.onLogout()
  }

  return {
    login,
    logout,
    fetchCurrentUser,
    me,
  }
}

export const useAuth = createSharedComposable(_useAuth)
