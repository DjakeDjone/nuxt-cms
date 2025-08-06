<script setup lang="ts">
import { computed, useRouter, useUserHandler } from '#imports'

defineOptions({
  name: 'UiSmartHeader',
})

const props = defineProps<{
  adminPrefix?: string
}>()

const { loggedIn } = useUserHandler()

const adminMode = defineModel<boolean>({
  type: Boolean,
  default: false,
})

const router = useRouter()
const pages = router.getRoutes()

const getRouteName = (routeName: string) => {
  const adminPrefixName = props.adminPrefix ? props.adminPrefix.replace(/^\//, '') : ''
  let name = routeName.replace('/', '')
  if (adminPrefixName && name.startsWith(adminPrefixName)) {
    name = name.replace(adminPrefixName, '')
  }
  name = name.replace(/-/g, ' ')
  name = name.trim()
  if (name.length > 0) {
    name = name.charAt(0).toUpperCase() + name.slice(1)
  } else {
    name = 'Home'
  }
  return name
}
// only show routes with the prefix if adminMode is true
// else routes without the prefix
const routes = computed(() => {
  return pages
    .filter(route => {
      if (props.adminPrefix) {
        return adminMode.value ? route.path.startsWith(props.adminPrefix) : !route.path.startsWith(props.adminPrefix)
      }
      return true
    })
    .map((route, _idx) => ({
      // remove the admin prefix from the name if it exists
      name: getRouteName(String(route.name) || route.path),
      path: route.path,
    }))

})

</script>

<template>
  <UiHeader>
    <template #default>
      <NuxtLink v-for="route in routes" :to="route.path" class="text-lg font-semibold">
        {{ route.name || route.path }}
      </NuxtLink>
    </template>
    <template #header-actions v-if="loggedIn">
      <UiTooltip content="Toggle Admin Mode" anchor="bottom">
        <UiSwitch v-model="adminMode" class="ui-switch" :size="15">
        </UiSwitch>
      </UiTooltip>
    </template>
  </UiHeader>
</template>
