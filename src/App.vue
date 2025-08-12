<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed, KeepAlive } from 'vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: themeStore.currentTheme,
      },
    }"
  >
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </a-config-provider>
</template>

<style scoped lang="scss"></style>
