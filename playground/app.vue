<template>
  <UiStyle>
    <!-- <nav class="flex gap-2 p-4 justify-center items-center w-full">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/admin">Admin</NuxtLink>
      <NuxtLink to="/login">Login</NuxtLink>
    </nav> -->
    <UiHeader>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/admin">Admin</NuxtLink>
      <NuxtLink to="/login">Login</NuxtLink>
    </UiHeader>
    <NotificationStack />
    <NuxtPage />
  </UiStyle>
</template>
