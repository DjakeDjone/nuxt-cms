<script setup lang="ts">
defineOptions({
  name: "UiSmartHeader",
});
import { useRouter } from "#imports";

const props = defineProps<{
  adminPrefix?: string;
}>();

const router = useRouter();
const pages = router.getRoutes();

const adminRoutes = pages.filter((route) => {
  return route.path.startsWith(props.adminPrefix || "/admin");
});
</script>

<template>
  <UiHeader>
    <NuxtLink
      v-for="route in adminRoutes"
      :to="route.path"
      class="text-lg font-semibold"
    >
      {{ route.name || route.path }}
    </NuxtLink>
  </UiHeader>
</template>
