<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { KeepAlive } from 'vue'
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#00b96b',
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
