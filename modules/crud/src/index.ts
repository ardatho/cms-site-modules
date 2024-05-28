import { createResolver, defineNuxtModule, extendPages, addRouteMiddleware, addImportsDir, addComponentsDir, installModule } from '@nuxt/kit'

import type { NuxtPage } from 'nuxt/schema';

export default defineNuxtModule({
  async setup(options, nuxt) {
		const { resolve } = createResolver(import.meta.url)

    // Transpile runtime
    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.options.alias['#crud'] = runtimeDir

    // await installModule('nuxt-icon');

    const customPages: NuxtPage[] = [];
    for (const type of options.types) {
      console.log('Register module:', type.id)
      customPages.push({
        name: type.id,
        path: `/${type.uri ? type.uri : type.id}`,
        file: resolve(runtimeDir, 'crud.vue'),
        meta: {
          auth: true,
          type: type.id,
          title: type.label,
        },
        children: [
          {
            path: 'add',
            name: `${type.id}-addItem`,
            file: resolve(runtimeDir, 'add.vue'),
            meta: {
              auth: true,
              type: type.id,
              contentBar: true,
            },
          },
          {
            path: '',
            name: `${type.id}-listing`,
            file: resolve(runtimeDir, 'items.vue'),
            meta: {
              auth: true,
              type: type.id,
              contentBar: true,
            },
          },
          {
            path: ':id/edit',
            name: `${type.id}-editItem`,
            file: resolve(runtimeDir, 'edit.vue'),
            meta: {
              auth: true,
              type: type.id,
              contentBar: true,
            },
          },
        ],
      })
    }

    addComponentsDir({
      path: resolve(runtimeDir, 'components'),
      pathPrefix: true,
      global: true,
      watch: true
    })

    addRouteMiddleware({
      name: 'crud',
      path: resolve(runtimeDir, 'crudMiddleware.ts'),
    })

    addImportsDir(resolve(runtimeDir, 'composables'))

    extendPages((pages) => {
      for (const page of customPages) {
        pages.unshift(page);
      }
    })
  }
})
