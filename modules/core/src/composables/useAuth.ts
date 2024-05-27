import { createSharedComposable } from '@vueuse/core'

import type { Nullable, User } from '~/types'

const _useAuth = () => {
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const toast = useToast();
  const me = ref<Nullable<User>>(null);

  const login = async (data: { username: string; password: string;}) => {
    try {
      const res = await nuxtApp.$apollo.defaultClient.mutate({
          mutation: gql`
            mutation Login($username: String!, $password: String!) {
              token: login(username: $username, password: $password)
            }
          `,
          variables: data
      });
      await nuxtApp.$apolloHelpers.onLogin(res.data.token);
      toast.add({ title: 'Login successfully'})

    } catch (e) {
        console.error(e)
    }
  }

  const verify = async (): Promise<string | void> => {
    try {
      const res = await nuxtApp.$apollo.defaultClient.mutate({
          mutation: gql`
            mutation Verify {
              token: verify
            }
          `,
      });
      await nuxtApp.$apolloHelpers.onLogin(res.data.token);
      return res.data.token
    } catch (err) {
      toast.add({ title: 'Something went wrong', color: 'red'})
      await router.push('/login');
      return;
    }
  }

  const fetchCurrentUser = async () => {
    try {
      me.value = await getMe()
    } catch (err) {
      toast.add({ title: 'Something went wrong', color: 'red'});
    }
  }

  const getMe = async () => {
    const results = await nuxtApp.$apollo.defaultClient.query({
      query: gql`
        query Me {
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
    verify,
    fetchCurrentUser,
    me,
  }
}

export const useAuth = createSharedComposable(_useAuth)
