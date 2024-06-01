export default defineNuxtRouteMiddleware(async (to, from) => {
  // skip middleware on server
  if (import.meta.server) return

  const { verify } = useAuth();
  const nuxtApp = useNuxtApp();
  let token = await nuxtApp.$apolloHelpers.getToken()
  if (['login', 'signup', 'forgot-password'].includes(to?.name as string)) {
    if (token) {
      return navigateTo({name: 'index'});
    }
    return
  }

  try {
    token = await verify();
    if (!token) {
      throw Error('Token missing')
    }
  } catch (e) {
    await navigateTo({ name: 'login' })
  }
  if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
})
