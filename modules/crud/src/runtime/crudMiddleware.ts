export default defineNuxtRouteMiddleware(to => {
  // skip middleware on server
  if (import.meta.server) return
  // skip middleware on client side entirely
  // if (import.meta.client) return
  // or only skip middleware on initial client load
  const nuxtApp = useNuxtApp()
  const appConfig: any = useAppConfig()
  console.log('Redirect to:', to);
  const currentModule = useState('currentModule');
  currentModule.value = appConfig.globalConfig.modules.crud.types.find((type: any) => type.id === to.meta.type);

  if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
})
