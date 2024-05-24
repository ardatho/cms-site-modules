<script setup lang="ts">
const route = useRoute()
const { isHelpSlideoverOpen, isNotificationsSlideoverOpen } = useDashboard()
const { fetchCurrentUser } = useAuth()
// definePageMeta({
//   middleware: ["auth"]
//   // or middleware: 'auth'
// })

const links = reactive([{
  id: 'home',
  label: 'ui.home',
  icon: 'i-heroicons-home',
  to: '/',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  }
}, {
  id: 'inbox',
  label: 'ui.inbox',
  icon: 'i-heroicons-inbox',
  to: '/inbox',
  badge: '4',
  tooltip: {
    text: 'Inbox',
    shortcuts: ['G', 'I']
  }
}, {
  id: 'users',
  label: 'user.users',
  icon: 'i-heroicons-user-group',
  to: '/users',
  children: [{
    label: 'user.users',
    to: '/users',
    exact: true
  }, {
    label: 'role.roles',
    to: '/roles',
    exact: true
  }],
  tooltip: {
    text: 'Users',
    shortcuts: ['G', 'U']
  }
}, {
  id: 'settings',
  label: 'ui.settings',
  to: '/settings',
  icon: 'i-heroicons-cog-8-tooth',
  children: [
    {
      label: 'ui.general',
      to: '/settings',
      exact: true
    },
    // {
    //   label: 'Members',
    //   to: '/settings/members'
    // },
    // {
    //   label: 'Notifications',
    //   to: '/settings/notifications'
    // }
  ],
  tooltip: {
    text: 'Settings',
    shortcuts: ['G', 'S']
  }
}])

const footerLinks = [{
  label: 'Invite people',
  icon: 'i-heroicons-plus',
  to: '/settings/members'
}, {
  label: 'Help & Support',
  icon: 'i-heroicons-question-mark-circle',
  click: () => isHelpSlideoverOpen.value = true
}]

const groups = [{
  key: 'links',
  label: 'Go to',
  commands: links.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts }))
}, {
  key: 'code',
  label: 'Code',
  commands: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    click: () => {
      window.open(`https://github.com/nuxt-ui-pro/dashboard/blob/main/pages${route.path === '/' ? '/index' : route.path}.vue`, '_blank')
    }
  }]
}]

const items = [[{
  label: 'New mail',
  icon: 'i-heroicons-paper-airplane',
  to: '/inbox'
}, {
  label: 'New user',
  icon: 'i-heroicons-user-plus',
  to: '/users'
}]]

await fetchCurrentUser()

</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <OrganizationsDropdown />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <SidebarLinks :links="links" />

        <div class="flex-1" />
        <UDivider />


        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <UDashboardPage>
      <UDashboardPanel grow>
        <UDashboardNavbar title="">
          <template #right>
            <UTooltip text="Notifications" :shortcuts="['N']">
              <UButton variant="ghost" square @click="isNotificationsSlideoverOpen = true">
                <UChip color="red" inset>
                  <UIcon name="i-heroicons-bell" class="w-5 h-5" />
                </UChip>
              </UButton>
            </UTooltip>

            <!-- <UDropdown :items="items">
              <UButton color="black" icon="i-heroicons-plus" size="md" class="ml-1.5 rounded-full" />
            </UDropdown> -->
          </template>
        </UDashboardNavbar>
        <slot />
      </UDashboardPanel>
    </UDashboardPage>

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />
    <!-- ~/components/NotificationsSlideover.vue -->
    <NotificationsSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>

    <UNotifications />
  </UDashboardLayout>
</template>
