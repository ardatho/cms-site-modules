import { createResolver, defineNuxtModule, extendPages, addRouteMiddleware, addImportsDir, addComponentsDir, installModule } from '@nuxt/kit'

import type { NuxtPage } from 'nuxt/schema';

export default defineNuxtModule({
  async setup(options, nuxt) {
		const resolver = createResolver(import.meta.url)

    // await installModule('nuxt-icon');

    const customPages: NuxtPage[] = [];
    for (const type of options.types) {
      console.log('Register module:', type.id)
      customPages.push({
        name: type.id,
        path: `/${type.uri ? type.uri : type.id}`,
        file: resolver.resolve('runtime/crud.vue'),
        meta: {
          auth: true,
          type: type.id,
          title: type.label,
        },
        children: [
          {
            path: 'add',
            name: `${type.id}-addItem`,
            file: resolver.resolve('runtime/add.vue'),
            meta: {
              auth: true,
              type: type.id,
              contentBar: true,
            },
          },
          {
            path: '',
            name: `${type.id}-listing`,
            file: resolver.resolve('runtime/items.vue'),
            meta: {
              auth: true,
              type: type.id,
              contentBar: true,
            },
          },
          {
            path: ':id/edit',
            name: `${type.id}-editItem`,
            file: resolver.resolve('runtime/edit.vue'),
            meta: {
              auth: true,
              type: type.id,
              contentBar: true,
            },
          },
        ],
      })
    }

    addRouteMiddleware({
      name: 'crud',
      path: resolver.resolve('runtime/crudMiddleware.ts'),
    })

    addImportsDir(resolver.resolve('runtime/composables'))

    extendPages((pages) => {
      for (const page of customPages) {
        pages.unshift(page);
      }
    })
  }
})
