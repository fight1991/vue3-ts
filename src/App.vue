<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { KeepAlive } from 'vue'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<style scoped lang="scss"></style>
